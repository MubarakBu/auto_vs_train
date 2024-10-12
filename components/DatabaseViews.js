// Header file for navigation

import Link from 'next/link';

const linkStyle = {
  margin: 10
};

const header = () => (
    <div>
		<Link href="/DB_Maintenance">
			<a style={linkStyle}>Database Home</a>
		</Link>
		<Link href="/StationList">
			<a style={linkStyle}>Station List</a>
		</Link>
		<Link href="/SearchLog">
			<a style={linkStyle}>Search Log</a>
		</Link>
		<Link href="/StationRoutes">
			<a style={linkStyle}>Routes</a>
		</Link>
    </div>
);

export default header;

