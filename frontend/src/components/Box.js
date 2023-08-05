const Box = ({rank, username,score}) => {
  return (
    <div className="leaderboard-box">
        <p key="1" className='ranking'>{rank}</p>
        <p key="2" className='username'> {username}</p>
        <p key="3" className='score'>{score}</p>
    </div>
  );
}
export default Box;