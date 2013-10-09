var animations = {
	player: {
		// higher is slower
		speed: 5,
		refreshRate: 4,
		file: "player",
		right:
		{
			idle:
			[
				{
					x:450,
					y:678,
					width:96,
					height:104
				},
				{
					x: 648,
					y: 678,
					width: 96,
					height: 104
				}
			],
			moving:[
				{
					x: 54,
					y: 58,
					width: 96,
					height: 105
				},
				{
					x: 247,
					y: 56,
					width: 96,
					height: 103
				},
				{
					x: 448,
					y: 54,
					width: 96,
					height: 100
				},
				{
					x:843,
					y:51,
					width:96,
					height:99

				},
				{
					x:1040,
					y:50,
					width:96,
					height:97
				},
				{
					x: 52,
					y:206,
					width: 96,
					height: 104
				},
				{
					x: 448,
					y:209,
					width: 96,
					height: 102
				},
				{
					x: 648,
					y:211,
					width: 96,
					height: 99
				}
			],
			attack:[
				{
					x:57,
					y:358,
					width:74,
					height:98
				},
				{
					x:221,
					y:348,
					width:103,
					height:102
				},
				{
					x:427,
					y:334,
					width:97,
					height:114
				},
				{
					x:645,
					y:317,
					width:79,
					height:133
				},
				{
					x:845,
					y:370,
					width:136,
					height:88
				},
				{
					x:1045,
					y:392,
					width:131,
					height:73
				}
			]

		}
	},
	cyclops: {
		speed: 5,
		refreshRate: 28,
		file: "cyclops",
		idle: [{
			x: 3,
			y: 16,
			width: 56,
			height: 80
		},{
			x: 64,
			y: 15,
			width: 56,
			height: 80
		}]
	}
};

var blocks = {
	grass_left: {
		x: 172,
		y: 36
	},
	grass_mid: {
		x: 206,
		y: 36
	},
	grass_right: {
		x: 342,
		y: 36
	}
};
