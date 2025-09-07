ALTER TABLE menus ADD CONSTRAINT unique_user_menu UNIQUE (user_id);

WITH duplicate_menus AS (
  SELECT user_id, 
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) as rn
  FROM menus
  WHERE user_id IS NOT NULL
)
DELETE FROM menus 
WHERE id IN (
  SELECT m.id 
  FROM menus m
  JOIN duplicate_menus dm ON m.user_id = dm.user_id
  WHERE dm.rn > 1
);
