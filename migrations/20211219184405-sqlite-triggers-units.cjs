'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    if (queryInterface.sequelize.getDialect() === 'sqlite') {
      await queryInterface.sequelize.query(`
      CREATE TRIGGER unit_insert_fts AFTER INSERT ON units BEGIN
        INSERT INTO units_fts(
          warehouseUnitId,
          orgUid,
          unitOwnerOrgUid,
          countryJurisdictionOfOwner,
          inCountryJurisdictionOfOwner,
          serialNumberBlock,
          serialNumberPattern,
          unitIdentifier,
          unitType,
          intendedBuyerOrgUid,
          marketplace,
          tags,
          unitStatus,
          unitTransactionType,
          unitStatusReason,
          tokenIssuanceHash,
          marketplaceIdentifier,
          unitsIssuanceLocation,
          unitRegistryLink,
          unitMarketplaceLink,
          correspondingAdjustmentDeclaration,
          correspondingAdjustmentStatus,
          vintageId
        ) VALUES (
          new.warehouseUnitId,
          new.orgUid,
          new.unitOwnerOrgUid,
          new.countryJurisdictionOfOwner,
          new.inCountryJurisdictionOfOwner,
          new.serialNumberBlock,
          new.serialNumberPattern,
          new.unitIdentifier,
          new.unitType,
          new.intendedBuyerOrgUid,
          new.marketplace,
          new.tags,
          new.unitStatus,
          new.unitTransactionType,
          new.unitStatusReason,
          new.tokenIssuanceHash,
          new.marketplaceIdentifier,
          new.unitsIssuanceLocation,
          new.unitRegistryLink,
          new.unitMarketplaceLink,
          new.correspondingAdjustmentDeclaration,
          new.correspondingAdjustmentStatus,
          new.vintageId
        );
      END;`);

      await queryInterface.sequelize.query(`
      CREATE TRIGGER unit_delete_fts AFTER DELETE ON units BEGIN
        DELETE FROM units_fts WHERE warehouseUnitId = old.warehouseUnitId;
      END;
      `);

      await queryInterface.sequelize.query(`
      CREATE TRIGGER unit_update_fts AFTER UPDATE ON units BEGIN
        DELETE FROM units_fts WHERE warehouseUnitId = old.warehouseUnitId;
        INSERT INTO units_fts(
          warehouseUnitId,
          orgUid,
          unitOwnerOrgUid,
          countryJurisdictionOfOwner,
          inCountryJurisdictionOfOwner,
          serialNumberBlock,
          serialNumberPattern,
          unitIdentifier,
          unitType,
          intendedBuyerOrgUid,
          marketplace,
          tags,
          unitStatus,
          unitTransactionType,
          unitStatusReason,
          tokenIssuanceHash,
          marketplaceIdentifier,
          unitsIssuanceLocation,
          unitRegistryLink,
          unitMarketplaceLink,
          correspondingAdjustmentDeclaration,
          correspondingAdjustmentStatus,
          vintageId
        ) VALUES (
          new.warehouseUnitId,
          new.orgUid,
          new.unitOwnerOrgUid,
          new.countryJurisdictionOfOwner,
          new.inCountryJurisdictionOfOwner,
          new.serialNumberBlock,
          new.serialNumberPattern,
          new.unitIdentifier,
          new.unitType,
          new.intendedBuyerOrgUid,
          new.marketplace,
          new.tags,
          new.unitStatus,
          new.unitTransactionType,
          new.unitStatusReason,
          new.tokenIssuanceHash,
          new.marketplaceIdentifier,
          new.unitsIssuanceLocation,
          new.unitRegistryLink,
          new.unitMarketplaceLink,
          new.correspondingAdjustmentDeclaration,
          new.correspondingAdjustmentStatus,
          new.vintageId
        );
      END;
      `);
    }
  },

  down: async (queryInterface, Sequelize) => {
    if (queryInterface.sequelize.getDialect() === 'sqlite') {
      await queryInterface.sequelize.query('DROP TRIGGER unit_insert_fts;');
      await queryInterface.sequelize.query('DROP TRIGGER unit_delete_fts;');
      await queryInterface.sequelize.query('DROP TRIGGER unit_update_fts;');
    }
  },
};
