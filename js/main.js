var feed = new Instafeed({
		get: 'user',
		userId: 4034986418,
		clientId: 'c82f268229d34673b0b4c1d6a75222b0',
		accessToken: '4034986418.1677ed0.a4168a68457c4a62a6ebae8d77340ace',
		target: 'instagram',
		resolution: 'standard_resolution',
		template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>',
		after: function() {
			var el = document.getElementById('instagram');
			if (el.classList)
					el.classList.add('show');
			else
					el.className += ' ' + 'show';
		}
});
feed.run();
