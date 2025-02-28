#!/bin/bash
echo "creating database table"
docker exec -it container-pg psql -U admin -d test_db -c 'CREATE TABLE Tree (id INT PRIMARY KEY,label VARCHAR(50),expanded BOOLEAN,parent_id INT,FOREIGN KEY (parent_id) REFERENCES Tree(id));'
echo "populating database"
docker exec -it container-pg psql -U admin -d test_db -c  "INSERT INTO Tree (id, label, expanded, parent_id) VALUES(1, 'Albums', TRUE, NULL),(2, 'Fleetwood Mac', TRUE, 1),(3, 'Radiohead', TRUE, 1),(4, 'Rumors', TRUE, 2), (5, 'Tusk', TRUE, 2),(8, 'The Chain', TRUE, 4),(9, 'Dreams', TRUE, 4),(10, 'Sara', TRUE, 5),(6, 'The Bends', TRUE, 3),(7, 'In Rainbows', TRUE, 3),(11, 'Fake Plastic Trees', TRUE, 6),(12, 'Videotape', TRUE, 7), (13, 'Bodysnatchers', TRUE, 7),(14, 'Faust Arp', TRUE, 7);"
