<?php

$installer = Mage::getResourceModel('catalog/eav_mysql4_setup', 'core_setup');

$attributesCodes = ['collection_category'];


$installer->startSetup();

$installer->addAttribute(Mage_Catalog_Model_Category::ENTITY, 'collection_category', array(
    'group' => 'General Information',
    'input' => 'select',
    'type' => 'int',
    'source' => 'eav/entity_attribute_source_boolean',
    'label' => 'Is Collection',
    'visible' => true,
    'default' => 0,
    'required' => false,
    'visible_on_front' => true,
    'global' => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_STORE,
));

$setId = Mage::getSingleton('eav/config')->getEntityType('catalog_category')->getDefaultAttributeSetId();

foreach ($attributesCodes as $attrCode) {
    $installer->addAttributeToGroup('catalog_category', $setId, 'General Information', $attrCode);
}


$installer->endSetup();