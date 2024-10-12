import React from 'react';
import ReactDOM from 'react-dom';
import TestHook from '../test_hook.js';
import {render, fireEvent, cleanup} from '@testing-library/react';

import IndexComponent from '../components/IndexPage'


afterEach(cleanup);

test('Test', () => {
	const { renderVar } = render(<IndexComponent />);

	
});