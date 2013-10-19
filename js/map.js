/**
 * 
 */

var map = [
           /*Platform right bottom*/
           new Block(468, 400, blocks.grass_left),
           new Block(500, 400, blocks.grass_mid),
           new Block(532, 400, blocks.grass_mid),
           new Block(564, 400, blocks.grass_right),
           
           /*Platform left middle*/
           new Block(104, 350, blocks.grass_left),
           new Block(136, 350, blocks.grass_mid),
           new Block(168, 350, blocks.grass_mid),
           new Block(200, 350, blocks.grass_mid),
           new Block(232, 350, blocks.grass_mid),
           new Block(264, 350, blocks.grass_mid),
           new Block(296, 350, blocks.grass_right),
           ];

load_map(map);