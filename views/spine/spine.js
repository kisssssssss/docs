'use client';
import React, { memo, useEffect } from 'react';

let current_spine = '';

const change_spine = location => {
	if (current_spine !== '') {
		current_spine.dispose();
	}

	document.getElementById('player-container').innerHTML = '';

	const path = `/model/${location[0]}/00/${location[1]}/${location[0]}${location[1] == 'default' ? '' : `_${location[1]}`}${
		location[1] == 'skillcut' ? '' : '_00'
	}.`;

	current_spine = new window.spine40.SpinePlayer('player-container', {
		// jsonUrl: "/assets/" + id + "/" + id + ".json",
		skelUrl: path + 'skel',
		atlasUrl: path + 'atlas',
		backgroundColor: '2f353a',
		animation: location[1] == 'default' ? 'idle' : '',
		skin: location[1] == 'skillcut' ? '' : '00'
	});

	document.querySelector('.spine-player-canvas').width = document.querySelector('.spine-player-canvas').height;

	document.querySelector('.spine-player-canvas').style.width = null;

	document.querySelector('.spine-player-canvas').style.display = 'inline';
};

const spine = memo(() => {
	useEffect(() => {
		let link1 = document.createElement('link');
		link1.setAttribute('rel', 'stylesheet');
		link1.setAttribute('type', 'text/css');
		link1.setAttribute('href', '/spine/spine-player.css');
		document.getElementsByTagName('head')[0].appendChild(link1);

		let link2 = document.createElement('link');
		link2.setAttribute('rel', 'stylesheet');
		link2.setAttribute('type', 'text/css');
		link2.setAttribute('href', '/spine/spine-page.css');
		document.getElementsByTagName('head')[0].appendChild(link2);
	}, []);

	useEffect(() => {
		//zoom
		document.addEventListener('wheel', e => {
			if (
				e.target !== document.querySelector('#background-div') &&
				e.target !== document.querySelector('.spine-player') &&
				e.target !== document.querySelector('.spine-player-canvas') &&
				e.target !== document.querySelector('body')
			) {
				return false;
			}

			let canvas = document.querySelector('#player-container');

			let height = canvas.style.height.replaceAll('vh', '');

			switch (e.deltaY > 0) {
				case true:
					if (parseInt(canvas.style.height.replaceAll('vh', '')) <= 20) return false;
					canvas.style.height = parseInt(height) - 5 + 'vh';
					break;
				case false:
					if (parseInt(canvas.style.height.replaceAll('vh', '')) >= 500) return false;
					canvas.style.height = parseInt(height) + 5 + 'vh';
					break;
			}
		});

		//click to drag and move the animation
		let move = false;
		let oldx = '';
		let oldy = '';

		document.addEventListener('mousedown', e => {
			if (e.target !== document.querySelector('.spine-player-canvas') && e.target !== document.querySelector('body')) {
				return false;
			}
			move = true;
			oldx = e.clientX;
			oldy = e.clientY;
		});

		document.addEventListener('mouseup', e => {
			oldx = '';
			oldy = '';
			move = false;
		});

		document.addEventListener('mousemove', e => {
			if (move) {
				let newx = e.clientX;
				let newy = e.clientY;
				let stylel, stylet;

				stylel = document.querySelector('#player-container').style.left.replaceAll('px', '');

				stylet = document.querySelector('#player-container').style.top.replaceAll('px', '');

				if (newx > oldx) {
					document.querySelector('#player-container').style.left = parseInt(stylel) + (newx - oldx) + 'px';
				}
				if (newx < oldx) {
					document.querySelector('#player-container').style.left = parseInt(stylel) + (newx - oldx) + 'px';
				}
				if (newy < oldy) {
					document.querySelector('#player-container').style.top = parseInt(stylet) + (newy - oldy) + 'px';
				}
				if (newy > oldy) {
					document.querySelector('#player-container').style.top = parseInt(stylet) + (newy - oldy) + 'px';
				}
				oldx = newx;
				oldy = newy;
			}
		});
	}, []);

	return (
		<>
			<div id='player-container' className='absolute' style={{ height: '100vh', left: '0px', top: '0px' }}></div>
			<div id='visualiserMain'>
				{['c010', 'c011', 'c012'].map(id => {
					return (
						<div key={id}>
							{['default', 'aim', 'cover', 'skillcut'].map((item, i) => (
								<li key={`${id}_${i}`} className='charDiv' onClick={() => change_spine([id, item])}>
									{id}/{item}
								</li>
							))}
						</div>
					);
				})}
			</div>
		</>
	);
});

export default spine;
