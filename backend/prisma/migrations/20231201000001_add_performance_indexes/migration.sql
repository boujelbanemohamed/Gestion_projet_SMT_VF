-- Migration pour ajouter les index de performance

-- Index sur la table users
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users"("email");
CREATE INDEX IF NOT EXISTS "users_role_idx" ON "users"("role");
CREATE INDEX IF NOT EXISTS "users_createdAt_idx" ON "users"("createdAt");

-- Index composites pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS "users_role_createdAt_idx" ON "users"("role", "createdAt");

-- Si vous avez d'autres tables, ajoutez leurs index ici
-- Exemple pour une table stock (si elle existe) :
-- CREATE INDEX IF NOT EXISTS "stock_quantity_idx" ON "stock"("quantity");
-- CREATE INDEX IF NOT EXISTS "stock_alertThreshold_idx" ON "stock"("alertThreshold");
-- CREATE INDEX IF NOT EXISTS "stock_location_cardType_idx" ON "stock"("locationId", "cardTypeId");

-- Exemple pour une table movements (si elle existe) :
-- CREATE INDEX IF NOT EXISTS "movements_createdAt_idx" ON "movements"("createdAt");
-- CREATE INDEX IF NOT EXISTS "movements_type_idx" ON "movements"("type");
-- CREATE INDEX IF NOT EXISTS "movements_user_createdAt_idx" ON "movements"("userId", "createdAt");
