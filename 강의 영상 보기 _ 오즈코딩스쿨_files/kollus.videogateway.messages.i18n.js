(function(module) {
	if(typeof define === 'function' && define.amd) {
		define(module);
	} else {
		window.KollusVideogatewayMessagesI18n = module();
	}
}(function() {
	var messages = {
			'_DEFAULT_MESSAGE_': {
				'en': 'Failed to load content, Please contact your content service provider.',
				'ko': '콘텐츠를 불러오는데 실패했습니다. 콘텐츠 서비스 업체에 문의해 주세요.',
				'ja': 'コンテンツの読み込みに失敗しました。コンテンツのサービス提供会社にお問い合わせください。',
				'zh': '装入内容失败 。 请咨询内容服务公司。'
			},
			'ERROR_NOT_ALLOWED_REFERER': {
				'en': 'This content cannot be played on an unauthorized domain.',
				'ko': '본 컨텐츠는 허용되지 않은 도메인에서 재생하실 수 없습니다.',
				'ja': '予期せぬエラーが発生しました。しばらくしてから再度お試しください。',
				'zh': '抱歉，您所在国家地域不能播放。'
			},
			'ERROR_REJECT_REFERER': {
				'en': 'This content cannot be played on an unauthorized domain.',
				'ko': '본 컨텐츠는 허용되지 않은 도메인에서 재생하실 수 없습니다.',
				'ja': '予期せぬエラーが発生しました。しばらくしてから再度お試しください。',
				'zh': '抱歉，您所在国家地域不能播放。'
			},
			'ERROR_NOT_ALLOWED_ACCESS_FOR_BLOCKING_CAPTURE': {
				'en': 'Your access to this content has been denied due to illegal screen recording. Please apply to your content provider.',
				'ko': '귀하는 무단 캡쳐 시도로 인해 서비스 담당자로부터 컨텐츠 접근이 차단된 상태입니다. 자세한 내용은 서비스 제공 업체에 문의하여 주시기 바랍니다.',
				'ja': '画面キャプチャーを感知したため、コンテンツへのアクセスを遮断します。サービス提供業者にお問い合わせください。',
				'zh': '由于非法屏幕录制，您对此内容的访问被拒绝。 请与内容提供商联系。'
			},
			'ERROR_NOT_SUPPORT_DEVICE': {
				'en': 'This content cannot be played on this device. Please apply to your content provider.',
				'ko': '본 디바이스에서 재생할 수 없는 컨텐츠입니다. 서비스 제공 업체에 문의하여 주시기 바랍니다.',
				'ja': 'このデバイスには対応していません。サービス提供業者にお問い合わせください',
				'zh': '此设备不受支持。 请联系服务提供商'
			},
			'ERROR_TOKEN_EXPIRED': {
				'en': 'Avaliable period to play this content is expired. Please try again.',
				'ko': '재생 가능한 유효시간이 지났습니다. 다시 시도하여 주시기 바랍니다.',
				'ja': '再生有効時間が過ぎています。再度アクセスしてください。',
				'zh': '播放有效时间已过。 请再次访问。'
			},
			'DOWNLOAD': {
				'en': 'Download',
				'ko': '다운로드',
				'ja': 'ダウンロード',
				'zh': '下载'
			},
			'NEED_NP_PLUGIN_INSTALL': {
				'en': 'You need Kollus player to watch this video.<br />After installing the Kollus player, please refresh the page.',
				'ko': '영상 재생을 위해 플레이어 설치가 필요합니다.<br />설치 후 F5 키를 눌러 페이지를 새로고침 해주세요.',
				'ja': 'コンテンツ再生のためにプレーヤーのインストールが必要です。<br />下のリンクをクリックしてファイルをダウンロード&インストールして下さい。<br />インストール後にブラウザにてF5キーを押してページを更新してください。',
				'zh': '由于播放视频，需要安装Kollus播放器。 <br />安装Kollus播放器完毕后，请按F5键刷新浏览器页面。'
			},
			'NEED_NP_PLUGIN_UPDATE': {
				'en': 'Player update is required.<br />After installing the latest version, please refresh the page.',
				'ko': '영상 재생을 위해 플레이어 업데이트가 필요합니다.<br />업데이트 후 F5 키를 눌러 페이지를 새로고침 해주세요.',
				'ja': 'プレーヤーを新しいバージョンへアップデートしてください。<br />下のリンクをクリックしてファイルをダウンロード&インストールして下さい。インストール後にブラウザにてF5キーを押してページを更新してください。',
				'zh': '由于播放视频，需要更新播放器。<br />更新完毕后，请按F5键刷新浏览器页面。'
			},
			'ADDITIONAL_INSTALLATION_GUIDE_FOR_CHROME42': {
				'en': 'If Kollus player doesn’t work properly then you should change Chrome Browser.<br />If You can not start playback then please change "Advanced Configuration" of Chrome.',
				'ko': '설치 후에도 영상이 보이지 않으면 Chrome 설정을 변경해주셔야 합니다.',
				'ja': 'プレーヤーをインストールしても再生ができない場合は、クロームブラウザの設定を変更しなければなりません。',
				'zh': '如果安装播放器后仍然无法播放视频，则必须更改Chrome浏览器设置。'
			},
			'GUIDE_FOR_CHROME42_CHANGING_SETTING': {
				'en': 'Configuration Guide',
				'ko': '설정 변경 안내',
				'ja': '設定変更案内',
				'zh': '设置变更指南'
			},
			'MOBILE_INSTALLATION_GUIDE_NOTIFY': {
				'en': 'To watch this video, you need to install the Kollus Player.',
				'ko': '영상 재생을 위해서 플레이어 설치가 필요합니다.<br />스토어에서 Kollus Player를 설치해주세요.',
				'ja': 'このコンテンツを再生するためにはプレーヤーのインストールが必要です。<br />Google play, App storeからKollus Playerアプリをインストールしてください。',
				'zh': '由于播放视频，需要安装Kollus播放器。 <br />请在应用商店安装Kollus播放器。'
			},
			'MOBILE_INSTALLATION_GUIDE_NOTIFY_BUTTON': {
				'en': 'Move to app store',
				'ko': '스토어 이동',
				'ja': 'Google play, App storeへ移動',
				'zh': '移动到应用商店'
			},
			'INSTALLATION_GUIDE_NOTIFY': {
				'en': 'Kollus Mac Player must be installed to watch this video.<br>Press [Download] button to install.<br>(Compatible only with Mac OS/X 10.9 Mavericks or later)',
				'ko': 'Mac 전용 플레이어를 통해 영상이 재생됩니다.<br>플레이어가 설치되지 않았을 경우 아래 버튼을 눌러주세요.<br>(Mac OS/X 10.9 매버릭스 이상에서만 설치 가능)',
				'ja': '再生のためにはMac専用プレーヤーをインストールする必要があります。<br>プレーヤーがインストールされてない場合、ダウンロードボタンをクリックしてください。<br>(Mac OS/X 10.9 Mavericks以上のバージョンでインストール可能です。)',
				'zh': '由于播放视频，需要安装Mac播放器。<br>如果没安装播放器，请点击下载按钮。<br>（您可以使用Mac OS / X 10.9 Mavericks或更高版本进行安装。）'
			},
			'PLAYER_NOT_SUPPORTED_OS': {
                'en': 'Your OS is out of date and cannot play this content. Please update to the latest version.',
                'ko': 'OS 버전이 낮아 재생할 수 없습니다. 최신 OS로 업그레이드해 주세요.',
                'ja': 'OSバージョンが古いので、最新OSバージョンでアップグレードしてください。',
                'zh': '您的操作系统版本过旧，无法支持此内容。请升级到最新版本。'
			},
			'PLAYER_INSTALLATION_GUIDE_FOR_MSIE64': {
				'en': 'This content cannot be played on 64-bit Internet Explorer.<br />After installing the patch as attached below, please close all browser windows opened.And try again.<br />[<a href="http://file.kollus.com/public/IE1064bit.exe">Download</a>]',
				'ko': 'Internet Explorer 64-bit 환경에서는 컨텐츠를 재생하실 수 없습니다.<br />아래의 IE 64-bit용 패치 파일을 다운로드 및 실행하시고 [예(Y)]를 클릭하신 후<br />브라우저를 모두 종료하시고 다시 접속해주시기 바랍니다.<br />[<a href="http://file.kollus.com/public/IE1064bit.exe">패치 파일 다운로드</a>]',
				'ja': 'Internet Explorer 64-bit環境ではコンテンツの再生ができません。<br />IE 64-bit用のパッチファイルをダウンロード及び実行して[はい(Y)]をクリックしてください。<br />	一度ブラウザを全て閉じてから再度接続してください。<br />[<a href="http://file.kollus.com/public/IE1064bit.exe">パッチファイルのダウンロード</a>]',
				'zh': '视频不能在Internet Explorer 64-bit 环境中播放。<br />下载并运行IE 64-bit补丁文件并单击[是（Y）]。 <br />请关闭所有浏览器并重新连接。 <br /> [<a href="http://file.kollus.com/public/IE1064bit.exe">下载补丁文件</a>]'
			},
			'PLAYER_INSTALLATION_GUIDE_FOR_CHROME64': {
				'en': 'This content cannot be played on 64-bit Chrome.<br />After installing 32-bit Chrome, please close all browser windows opened.<br />And try again.<br />[<a href="http://google.com/chrome" target="_blank">Chrome website</a>]',
				'ko': 'Chrome 64-bit 환경에서는 컨텐츠를 재생하실 수 없습니다.<br />아래의 링크를 클릭하셔서 32-bit용 Chrome을 설치하신 후<br />브라우저를 모두 종료하시고 다시 접속해주시기 바랍니다.<br />[<a href="http://google.com/chrome" target="_blank">크롬 설치 안내 페이지</a>]',
				'ja': 'Chrome 64-bit環境ではコンテンツの再生ができません。<br />下のリンクをクリックして32-bit用のChromeをインストールしてください。<br />インストール後にブラウザを全て閉じてから再度接続してください。<br />[<a href="http://google.com/chrome" target="_blank">Chromeインストール案内ページ</a>]',
				'zh': '视频不能在Internet Explorer 64-bit 环境中播放。<br/>请点击下面的链接安装Chrome 32-bit完毕后<br/>请关闭所有浏览器并重新连接。<br />[<a href="http://google.com/chrome" target="_blank">Chrome安装信息页面</a>]'
			},
			'PLAYER_INSTALLATION_GUIDE_FOR_FIREFOX64': {
				'en': 'This content cannot be played on 64-bit Firefox.<br />After installing 32-bit Firefox, please close all browser windows opened.<br />And try again.<br />[<a href="https://www.mozilla.org" target="_blank">Firefox website</a>]',
				'ko': 'Firefox 64-bit 환경에서는 컨텐츠를 재생하실 수 없습니다.<br />아래의 링크를 클릭하셔서 32-bit용 Firefox를 설치하신 후<br />브라우저를 모두 종료하시고 다시 접속해주시기 바랍니다.<br />[<a href="https://www.mozilla.org" target="_blank">파이어폭스 설치 안내 페이지</a>]',
				'ja': 'Firefox 64-bit環境ではコンテンツの再生ができません。<br />下のリンクをクリックして32-bit用のFirefoxをインストールしてください。<br />インストール後にブラウザを全て閉じてから再度接続してください。<br />[<a href="https://www.mozilla.org" target="_blank">Firefoxインストール案内ページ</a>]',
				'zh': '视频不能在Firefox 64-bit环境中播放。 <br />请点击下面的链接安装32-bit的Firefox。 <br />安装完毕后请关闭所有浏览器并重新连接。 <br /> [<a href="https://www.mozilla.org" target="_blank"> Firefox安装信息页面</a>]'
			},
			'ERROR_NO_LIVE_URL': {
				'en': 'No live streaming url.',
				'ko': '동영상을 재생할 URL이 존재하지 않습니다.',
				'ja': '動画再生に必要なURLがありません。',
				'zh': '播放视频的网址不存在。'
			},
            'ERROR_NOT_ALLOW_RLINK': {
                'en': 'No live streaming url.',
                'ko': '동영상을 재생할 URL이 존재하지 않습니다.',
                'ja': '動画再生に必要なURLがありません。',
                'zh': '播放视频的网址不存在。'
            },
            'ERROR_NOT_SUPPORT_BROWSER': {
                'en': 'Videos cannot be played on Internet Explorer. Please use the Chrome browser.',
                'ko': '인터넷 익스플로러에서는 비디오를 재생할 수 없습니다.\n크롬 브라우저를 이용해주세요.',
                'ja': 'Internet Explorerではビデオを再生できません。Chromeブラウザをご利用ください。',
                'zh': '在Internet Explorer上无法播放视频。请使用Chrome浏览器。'
            },
            'ERROR_DETECT_DEVTOOLS': {
                'en': 'Playback request is not allowed in this environment.\nPlease stop developer tools or use a normal browser.',
                'ko': '허용되지 않은 환경에서의 영상 재생 요청 입니다.\n개발자 도구를 중지하거나, 정상적인 브라우저에서 사용해 주세요',
                'ja': 'この環境では再生リクエストが許可されていません。\nデベロッパーツールを停止するか、通常のブラウザを使用してください。',
                'zh': '此环境不允许播放请求。\n请停止开发者工具或使用正常的浏览器。'
            },
            'ERROR_NOT_ALLOW_ARM_PC': {
                'en': 'Content cannot be played on ARM PC, Please contact your content service provider.',
                'ko': 'ARM PC에서는 콘텐츠를 재생할 수 없습니다. 콘텐츠 서비스 업체에 문의해 주세요.',
                'ja': 'ARM PCにはコンテンツ再生ができません。コンテンツのサービス提供会社にお問い合わせください。',
                'zh': 'ARM PC无法播放内容。 请咨询内容服务公司。'
            }
    };

	var	getLanguageFullCode = function() {
            return (navigator.language || navigator.browserLanguage || navigator.userLanguage || 'en').toLowerCase();
        },
		getLanguageCode = function() {
			return getLanguageFullCode().substr(0, 2);
		},
		getTranslatedText = function(message_key) {
			var language_code = getLanguageCode();

            // 중국어일때 간체가 아니면 영문 사용
            if(language_code === 'zh' && getLanguageFullCode() !== 'zh-cn') language_code = 'en';

            // message_key가 없으면 DEFAULT_MESSAGE를 사용.
            // message_key의 language_code가 없거나, '' 면 영문 스트링을 출력.
            if(messages[message_key] === undefined) message_key = '_DEFAULT_MESSAGE_';
			if(messages[message_key][language_code] === undefined || messages[message_key][language_code] === '') {
				return messages[message_key]['en'];
			} else {
				return messages[message_key][language_code];
			}
		};

	return {
		le: function(message_key) {
			return getTranslatedText(message_key);
		},
		getLanguageCode: function() {
			return getLanguageCode();
		}
	};
}));
