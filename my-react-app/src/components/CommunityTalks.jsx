import React, { useEffect } from 'react';
import './communityTalks.css';

const CommunityTalks = () => {
  useEffect(() => {
    // Redirect user to your Discord invite link
    window.location.href = 'https://discord.gg/Mrfnzwzj';
  }, []);

  return (
    <div className="talks-redirect">
      <h2>🔗 Redirecting to Discord Community...</h2>
      <p>If you're not redirected automatically, <a href="https://discord.gg/Mrfnzwzj">click here</a>.</p>
    </div>
  );
};

export default CommunityTalks;
