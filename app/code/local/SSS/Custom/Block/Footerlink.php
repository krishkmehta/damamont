<?php

class SSS_Custom_Block_Footerlink extends Mage_Core_Block_Template
    implements Mage_Widget_Block_Interface
{

    protected function _toHtml()
    {

        return Mage::getSingleton('core/layout')->createBlock('core/template')->setTemplate('page/html/accordion.phtml')
            ->toHtml();;
    }
}