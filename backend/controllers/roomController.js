const User = require('../models/userModel');
const Room = require('../models/roomModel');
const {
    retRandProblems
} = require('../controllers/problemController');

function generateRoomId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 function isAlphanumeric(str) {
    return /^[a-z0-9]+$/i.test(str);
}

const createRoom = async ({diffs, num_players, username, socket_id}) =>{
    console.log("Starting room creation");
    let errorFields = [];
    if(diffs.length === 0){
        errorFields.push('diffs');
    }
    if(!username) {
        errorFields.push('username');
    }
    if(!num_players) {
        errorFields.push('num_players');
    }
    if(errorFields.length > 0 ){
        return {user: null, room: { error: 'Please fill in all the fields', errorFields }};
    }
    if(!isAlphanumeric(username)){
        errorFields.push('username');
        return {user: null, room:{ error: 'Username not alphanumeric', errorFields}};
    }
    const problems = await retRandProblems(diffs, 3);
    const room_name = generateRoomId(6);
    const user = await createUser({username, room_name, socket_id})
    if(user.error){
        console.log(user);
        return {user: null, room:user};
    }
    try{
        const room = await Room.create({
            room_name,
            num_players,
            diffs,
            num_problems: 3,
            user_ids: [user._id],
            problem_ids: problems,
            room_state: 'waiting'
        })
        const populatedRoom = await Room.findById(room._id).populate('user_ids');
        console.log(populatedRoom);
        return {user, room: populatedRoom};
    }
    catch(error){
        throw error;
    }
}


const joinRoom = async ({room_name, username, socket_id}) => {
    try{
        let errorFields = [];
        if(!room_name){
            errorFields.push('room_name');
        }
        if(!username) {
            errorFields.push('username');
        }
        if(errorFields.length > 0 ){
            return {user: null, room: { error: 'Please fill in all the fields', errorFields }};
        }
        if(!isAlphanumeric(username)){
            errorFields.push('username');
            return {user: null, room: { error: 'username not alphanumeric', errorFields}};
        }
        const og_room = await getRoomByName(room_name);
        if(og_room){
            if(og_room.room_state === 'waiting'){
                console.log("Room exists Players:" + og_room.user_ids.length);
                const user = await createUser({username, room_name, socket_id});
                if(user.error){
                    console.log(user);
                    return{user: null, room: user};
                }
                let room;
                if(og_room.user_ids.length + 1 == og_room.num_players){
                    room = await Room.findOneAndUpdate(
                        { room_name: room_name }, 
                        { 
                            $push: { user_ids: user._id },
                            $set: {room_state: 'in progress'}
                        },
                        { new: true } // This option returns the updated document
                    ).populate('user_ids');
                }
                else{
                    room = await Room.findOneAndUpdate(
                        { room_name: room_name }, 
                        { $push: { user_ids: user._id } },
                        { new: true } // This option returns the updated document
                    ).populate('user_ids');
                }
                console.log(room);
                return {user, room};
            }
            else{
                errorFields.push('room_name');
                return {user: null, room: { error: "Room is full", errorFields}};
            }
        }
        else{
            errorFields.push('room_name');
            return {user: null, room: { error: "Room does not exist", errorFields}};
        }
    }
    catch(error){
        throw error;
        
    }
}

const createUser = async({username, room_name, socket_id}) => {
    try{
        const user = await User.create({
            username,
            room_name,
            current_problem: 1,
            score: 0,
            socket_id
        });
        console.log(user);
        return user;
    }
    catch(error){
        if (error.code === 11000) {
            console.error("You have already joined/created a room");
            return { error: "You have already joined/created a room", errorFields: ['username']};
        }
        throw error;
    }
}

// have to reset room state if someone leaves
const deleteUser = async({socket_id}) => {
    try{
        console.log("Deleting user");
        const user = await User.findOneAndDelete({socket_id});
        if(!user){
            console.log("Error no such user");
            return null;
        }
        let room = await Room.findOneAndUpdate({room_name: user.room_name},
            {$pull: {user_ids: user._id}}, {new:true});
        if (!room) {
            console.log('No room found with that name');
        }
        else{
            if(room.user_ids.length === 0){
                console.log('Deleting room');
                room = await Room.findByIdAndDelete(room._id);
            }
            console.log(room);
        }
        console.log(user);
        return user;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

const updateUser = async(new_user) => {
    try{
        console.log("Updating user");
        const updatedUser = await User.findByIdAndUpdate(
            new_user._id,
            new_user,
            {new: true}
        )
        if(!updatedUser){
            console.log("User with id " + new_user._id +  "not found");
            return null;
        }
        console.log("User updated successffully: ", updatedUser);
        return updatedUser;
    }
    catch(error){
        console.error("Error updating user:", error);
        throw error;
    }
}


const getRoomByName = async (room_name) => {
    try{
        const room = await Room.findOne({room_name});
        if(!room){
            console.log("No such room");
            return null;
        }
        return room;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

const reqRoomByName = async (req, res) => {
    console.log("Getting room by name");
    const {room_name} = req.params;
    console.log('Room name: ' + room_name);
    const {_id} = req.body;
    console.log('User: ' + _id);
    try{
        const room = await Room.findOne({room_name}).populate('user_ids');
        if(!room){
            console.log("No such room");
            return res.status(404).json({error: 'No such room'});
        }
        const userIds = room.user_ids.map(user => user._id.toString());

        // Check if the _id exists in the user_ids array
        if (userIds.includes(_id)) {
            return res.status(200).json(room);
        } else {
            return res.status(403).json({error: 'User ID does not exist in the room'});
        }
    }
    catch(error){
        console.error(error);
        res.status(400).json(error);
    }
}

const getRoomPopByName = async (req, res) => {
    console.log("Getting room by name");
    const {room_name} = req.params;
    console.log('Room name: ' + room_name);
    const {_id} = req.body;
    console.log('User: ' + _id);
    try{
        const room = await Room.findOne({room_name}).populate('user_ids').select('user_ids num_players room_state');;
        if(!room){
            console.log("No such room");
            return res.status(404).json({error: 'No such room'});
        }
        const userIds = room.user_ids.map(user => user._id.toString());

        // Check if the _id exists in the user_ids array
        if (userIds.includes(_id)) {
            return res.status(200).json(room);
        } else {
            return res.status(403).json({error: 'User ID does not exist in the room'});
        }
    }
    catch(error){
        console.error(error);
        res.status(400).json(error);
    }
}






module.exports = {
    createRoom,
    joinRoom,
    createUser,
    updateUser,
    deleteUser,
    generateRoomId,
    reqRoomByName,
    getRoomPopByName};