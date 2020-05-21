<?php
namespace Grav\Theme;

use Grav\Common\Grav;
use Grav\Common\Theme;

class PortfolioForArtists extends Theme {
  // Access plugin events in this class

  // Add images to twig template paths to allow inclusion of SVG files
  public function onTwigLoader() {
    $theme_paths = Grav::instance()['locator']->findResources('theme://assets/img');
    foreach(array_reverse($theme_paths) as $images_path) {
        $this->grav['twig']->addPath($images_path, 'images');
    }
  }

  // Add assets to the Admin
  public function onAssetsInitialized() {
    if ($this->isAdmin()) {
      // add JS
      $this->grav['assets']->addJs('theme://assets/js/admin-custom.build.js', 1);
      // add CSS
      $this->grav['assets']->addCss('theme://assets/css/admin-custom.css', 1);
    }
  }
}
