import React from 'react';

const InviteUser = () => {
  const handleInvite = () => {
    alert("Invite link copied to clipboard! (mock)");
  };

  return (
    <div>
      <button onClick={handleInvite}>Invite to Wishlist</button>
    </div>
  );
};

export default InviteUser;
