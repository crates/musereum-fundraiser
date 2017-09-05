import React from 'react';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div>
      <div>404 Not Found</div>
      <Link to="/contacts">Go to contacts</Link>
    </div>
  );
}
