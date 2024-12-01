#include <vector>
#include <memory>
#include "mobs/player.h"
#include "world-objects/tree.h"
#include "world-objects/rock.h"
#include "../gui/minimap.h"

class EntityHandler {
    private:
        std::unique_ptr<Player> player = std::make_unique<Player>();
        std::vector<std::unique_ptr<Tree>> trees;
        std::vector<std::unique_ptr<Rock>> rocks;
        std::vector<Entity*> visibleEntities;

        Minimap minimap;
    
    public:
        void generateEntities(Map& map);
        void checkEntityCollisions();
        void checkForInteractableEntity();

        void events(Map& map);
        void update(Map& map);
        void draw(Map& map, Assets& assets);
};