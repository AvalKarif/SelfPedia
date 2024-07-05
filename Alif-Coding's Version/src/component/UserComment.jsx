

const UserComment = ({ body, createdAt, name, msg }) => {
  console.log("info", body, createdAt, name, msg);
  return (
    <>
      <div className="flex w-full flex-coll">
        {msg ? (
          <h4>{msg}</h4>
        ) : (
          <div>
            <h3 className="text-start">
              {name} - {createdAt?.toDate().toDateString()} :
            </h3>
            <p>{body}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UserComment;
