<?php

class Kinex_CategoryAttribute_Block_Categorylist extends Mage_Core_Block_Template
    implements Mage_Widget_Block_Interface
{


    protected function _toHtml()
    {
//        $categories = Mage::getModel('catalog/category')
//            ->getCollection()
//            ->addAttributeToFilter('category_enable_home',1)
//            ->addAttributeToSelect('*');
        $categories = Mage::getModel('catalog/category')
            ->getCollection()
            ->addAttributeToSelect("*")
            ->addAttributeToFilter('category_enable_home', 1)
            ->addAttributeToSort('category_position', ASC)
            ->addAttributeToSort('name', ASC);


        ob_start();
        foreach ($categories as $category) {

            ?>
            <div class="col col-1-4">
                <div class="product-list">


                    <?php
                    $cate_country = $category->getCategoryCountry();

                    $main_image = $category->getCategoryMainImage();

                    $main_image = trim(Mage::getBaseUrl('media') . 'catalog/category/' . $main_image);

                    $sec_image = $category->getCategorySecImage();

                    $sec_image = trim(Mage::getBaseUrl('media') . 'catalog/category/' . $sec_image);


                    $category_tagline = $category->getCategoryTagline();

                    $category_home_desc = $category->getCategoryHomeDesc();

                    $category_feature = $category->getCategoryFeature();
                    ?>
                    <?php if ($cate_country): ?>
                        <a href="<?php echo $category->getUrl(); ?>">
                            <div class="country-name"><?php echo $cate_country;
                                ?></div>
                        </a>
                    <?php endif; ?>

                    <div class="collection-block feature-img">
                        <a class="collection-block-link" href="<?php echo $category->getUrl(); ?>">
                            <img class="bottom" src="<?php echo $sec_image; ?>" alt="Main"/>
                            <img class="top" src="<?php echo $main_image; ?>" alt="Main"/>
                            <?php if ($category_tagline): ?>
                                <div class="caption"><?php echo $category_tagline; ?></div>
                            <?php endif; ?>
                        </a>
                    </div>
                    <h2 class="product-title"><a href="<?php echo $category->getUrl(); ?>"><?php echo
                            $category->getName(); ?></a></h2>
                    <div class="cat-name">
                        <?php echo substr($category_home_desc, 0, 100);
                            echo (strlen($category_home_desc)>100)?'....':''; ?>
                    </div>
                    
                    <?php if ($category_feature): ?>
                        <div class="desc">Combinable with: <?php echo $category_feature; ?></div>
                    <?php endif; ?>
                </div>
            </div>

            <?php


        }
        $content = ob_get_contents();
        ob_end_clean();
        return $content;

    }
}

;