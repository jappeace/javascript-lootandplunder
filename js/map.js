/**
 * 
 */

var map = [
           /*Platform right bottom*/
           new Block(468, 420, blocks.grass_left),
           new Block(500, 420, blocks.grass_mid),
           new Block(532, 420, blocks.grass_mid),
           new Block(564, 420, blocks.grass_right),
           
           /*Platform left middle*/
           new Block(104, 320, blocks.grass_left),
           new Block(136, 320, blocks.grass_mid),
           new Block(168, 320, blocks.grass_mid),
           new Block(200, 320, blocks.grass_mid),
           new Block(232, 320, blocks.grass_mid),
           new Block(264, 320, blocks.grass_mid),
           new Block(296, 320, blocks.grass_right),
           ];

load_map(map);