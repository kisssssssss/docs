'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// const tools = {
// 	hitokoto: {
// 	  icon: fa_comment,
// 	  callback: () => {
// 	    // 增加 hitokoto.cn 的 API
// 	    fetch("https://v1.hitokoto.cn")
// 	      .then((response) => response.json())
// 	      .then((result) => {
// 	        const text = `这句一言来自 <span>「${result.from}」</span>，是 <span>${result.creator}</span> 在 hitokoto.cn 投稿的。`;
// 	        showMessage(result.hitokoto, 6000, 9);
// 	        setTimeout(() => {
// 	          showMessage(text, 4000, 9);
// 	        }, 6000);
// 	      });
// 	  },
// 	},
// 	asteroids: {
// 	  icon: fa_paper_plane,
// 	  callback: () => {
// 	    if (window.Asteroids) {
// 	      if (!window.ASTEROIDSPLAYERS) window.ASTEROIDSPLAYERS = [];
// 	      window.ASTEROIDSPLAYERS.push(new Asteroids());
// 	    } else {
// 	      const script = document.createElement("script");
// 	      script.src =
// 	        "https://fastly.jsdelivr.net/gh/stevenjoezhang/asteroids/asteroids.js";
// 	      document.head.appendChild(script);
// 	    }
// 	  },
// 	},
// 	"switch-model": {
// 	  icon: fa_user_circle,
// 	  callback: switchModel,
// 	},
// 	"switch-texture": {
// 	  icon: fa_street_view,
// 	  callback: switchTexture,
// 	},
// 	photo: {
// 	  icon: fa_camera_retro,
// 	  callback: () => {
// 	    showMessage("照好了嘛，是不是很可爱呢？", 6000, 9);
// 	    Live2D.captureName = "photo.png";
// 	    Live2D.captureFrame = true;
// 	  },
// 	},
// 	info: {
// 	  icon: fa_info_circle,
// 	  callback: () => {
// 	    open("https://github.com/kisssssssss");
// 	  },
// 	},
// 	quit: {
// 		icon: fa_xmark,
// 		callback: () => {
// 			// showMessage('愿你有一天能与重要的人重逢。', 2000, 11);
// 			const container = document.getElementById('live2d-container');
// 			container.style.bottom = '-500px';
// 			setTimeout(() => {
// 				container.style.display = 'none';
// 				document.getElementById('toggle').classList.add('toggle-active');
// 			}, 3000);
// 		}
// 	}
// };

const tools = [
	{
		id: 'quit',
		icon: faXmark,
		callback: (container, toggle) => {
			// 将容器移动到屏幕下方
			container.current.style.bottom = '-500px';
			setTimeout(() => {
				// 隐藏容器
				container.current.style.display = 'none';
				// 显示‘live2d’按钮
				toggle.current.classList.add('toggle-active');
			}, 1500);
		}
	}
];

export default function Live2DTools({ container, toggle }) {
	return (
		<div id='tool'>
			{tools.map(tool => {
				return <FontAwesomeIcon key={tool.id} icon={tool.icon} onClick={() => tool.callback(container, toggle)} />;
			})}
		</div>
	);
}
