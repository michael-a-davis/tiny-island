# Release Notes

### Alpha 1.2.8
Likely the last update before Alpha 1.3. This update has focused primarily on scalability. Some
changes to the architecture to account for more items, more crafting recipes, and a wider
scope of tools and things to do. Copper nuggets can now be found through fishing.

### Alpha 1.2.7
Fishing pole is now fully craftable and auto-equips to the X button. Architecture for checking whether
you are in a valid fishing location has been implemented. I plan to flesh out the fishing feature so
that one may obtain copper to build better tools. More crafting features shall be implemented.

### Alpha 1.2.6
Some more slight UI adjustments. Added a few actions. Shaking the tree now produces sticks, string, and leaves.
Searching the sand, you can find worms. Next update should be the crafting upate.

### Alpha 1.2.5
Some slight UI adjustments after testing of the previous version proved a little broken. It's completely
broken for desktop currently, but I am focused on mobile development for now. A lot of this update was
pure clean up and restructuring of the code - A reorganizing update if you will. The ideas are starting
to come together now. I expect an Alpha 1.3 very soon.

### Alpha 1.2.4
Some more UI updates. The hint button is now represented by a question mark, and a full set of face
buttons have been added. The plan for now is to rework the crafting architecture and to get it functioning.

### Alpha 1.2.3
Some UI edits -- moved the hint and crafting buttons to the bottom and grouped with A and B buttons.

### Alpha 1.2.2
Crafting menu has been added. No crafting functionality yet, but the menu displays your current
inventory. An output menu will be added to craft items.

### Alpha 1.2.1
Added ability to shake trees and occasionally receive sticks from doing so. Added a crafting button
but no menu yet. Fixed a small bug where log text would stay on screen after performing an action.
It now disappears once walking away.

### Alpha 1.2
Pick and axe tools remain dormant in the architecture. Big changes to the UI. There are now A and
B buttons, a game log, and a hint box to guide players. It should be shaping up into a more fleshed
out game here very soon.

### Alpha 1.1.1
Added a rock texture and a pick tool to mine them out of the ground.

### Alpha 1.1.0
Some big changes in this version. The list includes:
- Major CSS cleanup and additions to make the site more responsive
- An axe tool has been added with the ability to chop down trees. Press "i" on the keyboard to use
it on desktop.
- Have renamed the controls.js file into movement.js to handle character movement only. A separate
file tools.js has been created to handle tools, the other half of the control environment.

### Alpha 1.0.6
Added keyboard controls. W, A, S, and D for movement. The player now faces the direction of a button
press regardless of whether or not he can be moved there. In addition, the player object now has a
"facing" parameter to keep track of which direction he is facing at all times.

### Alpha 1.0.5
Added a parameter to tiles called "collision" to check whether or not a player can walk into them,
applied to both ocean tiles and tree tiles, and more to come. The controls then simply check whether
the desired tile to enter has a state of collision on it and prevents the player from moving there
if it does.

Secondly, added a second ring of ocean around the perimeter so now players can walk freely along
the actual shores of the island. The full island is now accessible.

### Alpha 1.0.4
Added a simple character sprite to the game with a second tile layer that sits on
top of the main grid. The character exists on this second layer and can move freely
about the island.

### Alpha 1.0.3
Edits to CSS and control button generation to have an appearance more aligned to a directional pad.

### Alpha 1.0.2
Re-upped tree max and minor CSS edits to make the control buttons appear in a cross.

### Alpha 1.0.1
Fixed the perimeter bug so that users can walk closer to the shores. May add the ability to walk on
the actual perimeter of the island.

### Alpha 1.0
New updated version due to lots of changes - primarily to the concept of the game. Tiny Town is now Tiny Island! The path-building
module has taken a back seat to the new functions I am implementing.

Changes from previous version include:
- There is now a player! Represented by a single red dot for now.
- The grid is now a fixed size of 5x5, but the size of the total map remains configurable. A "camera" system has been implemented that
updates everytime the player moves.
- Control buttons. Limtied for now, but controls the player as they navigate the tiles.
- Random tree generation. The map now generates with random trees and a configurable max tree variable.
- Very basic collision has been implemented - The player character cannot walk into trees.
- The path, tree, and water tools have been removed, though I plan to return these features in updated ways at a later time.
- Instead of having separate key-value pairs for all possile states stored as bool values, tiles now have one parameter "state"
that stores a string value. For example, "tree" if it is a tree tile or "water" if it is a water tile.
- Tile neighbor state array: Instead of generating a binary string of digits to represent alike neighbors, the array can now account for
all possible states of a tile's neighbors. It pushes a single character to the string, each representing aseparate tile type ("T" for tree
tiles, "W" for water tiles, etc).
- The Javascript file has been broken up into several files for organizational purposes. There are four of these scripts currently, though no doubt that number will expand as the scope of the game increases. For now we have config.js, a developer's configuration file to easily change the game state. Data.js contains variables and information that are unconfigurable. Controls.js handles the creation and event handlers for the new control buttons. Grid.js handles the creation and updating of the grid.

Known Issues:
- The player character cannot walk up to the perimeter of the island is contained to 2 squares before it. This is due to how the Update
Tiles function is coded. I plan to include a true perimeter of full water tiles to allow the player to access the island perimeter.

### Alpha 0.7
Added a water tool to craft riverways. Currently pondering ways to expand the neighbor array to account for diagonal neighbors in addition to orthogonal ones to allow for double-wide paths and waterways. The number of possible combination of eight variables proves to be challenging in terms of scope. 256 cases versus 16 with the current model.

### Alpha 0.6
Added a tree tool with a single tree texture. Plan to add more textures in the future for random generation.

### Alpha 0.5
New textures for grass and path tiles. Likely still temporary, but better than what was there before. Major changes to the infrastructure to allow for easy addition of further tools. Instead of cycling through each possible combination of neighbor paved states, the code now generates a state array of 0s and 1s (0 for unpaved, 1 for paved). A switch statement then handles each possible combination of neighbor states.

### Alpha 0.4
This build solved two of the biggest problems I was facing during testing. In order to update the tiles, a loop iterates through each of them, assesses the state of its neighbors (paved or unpaved), and determines which texture to apply based on this. The issue is when it came to the perimeter of the grid. It kept searching for tiles that did not exist (for example, a tile at the top of the grid has no neighbor directly above it), which broke the code.

In addition, I wanted the paths on the perimeter to appear as though they were connecting to another path outside the grid, to give the illusion that this little world extends beyond what the user can interact with. I had initially planned to write a specific chain of conditions that applied only to perimeter tiles to account for both of these problems, but instead, I stumbled into a solution that knocks out both of these problems and actually required less code in the end.

I simply applied a permanent state of being paved to the perimeter tiles and hid them. The true perimeter of the grid does not exist to the user. It is a phantom ring beyond the visible grid. This solves the problem of having to account for tiles beyond the scope of the grid because the UpdateTiles function never has to touch the perimeter. It also solves the problem of applying different textures to the perimeter because they are always connected to the outside now.

### Alpha 0.3
Added configurable grid width and height variables. The script automatically styles the grid and detects its new perimeter for easy configuration.

### Alpha 0.2
Added some minor CSS fixes to make the grid of tiles more responsive.

### Alpha 0.1
My initial commit. This build defined the grid-building function. Simple testing of the path-building logic. Temporary textures for grass and paths.