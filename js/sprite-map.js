var animations = {
	player: {
		// higher is slower
		speed: 5,
		refreshRate: 4,
		file: "player",
		width: 2376,
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
					height:128
				},
				{
					x:221,
					y:348,
					width:103 + 75 - 39,
					height:128
				},
				{
					x:427,
					y:334,
					width:97 + 67 - 39,
					height:128
				},
				{
					x:645,
					y:317,
					width:79 + 49 - 39,
					height:128
				},
				{
					x:845,
					y:370,
					width:136 + 49 - 39,
					height:128
				},
				{
					x:1045,
					y:392,
					width:131 + 54 - 39,
					height:128
				}
			]

		}
	},
	cyclops: {
		speed: 5,
		refreshRate: 28,
		file: "cyclops",
		width: 1000,
		right:{
			idle: [{
				x: 441,
				y: 16,
				width: 56,
				height: 80
			},{
				x: 380,
				y: 15,
				width: 56,
				height: 80
			}],
			moving: [{
				x: 119,
				y: 30,
				width:58,
				height:63
			}],
			attack:[
				{
					x: 233,
					y: 96,
					width:97,
					height:96
				},
				{
					x: 233,
					y: 96,
					width:97,
					height:96
				},
				{
					x: 233,
					y: 96,
					width:97,
					height:96
				}
			]
		}
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
	},
	dirt_mid: {
		x: 172,
		y: 206
	},
	dirt_mid_2: {
		x: 207,
		y: 206
	},
	dirt_mid_3: {
		x: 138,
		y: 206
	},
	glass: { 
		x: 2,
		y: 342
	},
	glass_2: { 
		x: 2,
		y: 342
	}
};
