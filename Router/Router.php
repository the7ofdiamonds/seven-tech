<?php

namespace SEVEN_TECH\Router;

use Exception;

use SEVEN_TECH\Pages\Pages;
use SEVEN_TECH\Post_Types\Post_Types;
use SEVEN_TECH\Taxonomies\Taxonomies;
use SEVEN_TECH\Templates\Templates;
use SEVEN_TECH\Templates\TemplatesCustom;

class Router
{
    private $front_page_react;
    private $custom_pages_list;
    private $protected_pages_list;
    private $pages_list;
    private $post_types_list;
    private $taxonomies_list;
    private $templates;
    private $templates_custom;

    public function __construct(
        Pages $pages,
        Post_Types $posttypes,
        Taxonomies $taxonomies,
        Templates $templates,
        TemplatesCustom $templates_custom
    ) {
        $this->front_page_react = $pages->front_page_react;
        $this->custom_pages_list = $pages->custom_pages_list;
        $this->protected_pages_list = $pages->protected_pages_list;
        $this->pages_list = $pages->pages_list;

        $this->post_types_list = $posttypes->post_types_list;
        $this->taxonomies_list = $taxonomies->taxonomies_list;

        $this->templates = $templates;
        $this->templates_custom = $templates_custom;
    }

    function load_page()
    {
        try {
            $path = $_SERVER['REQUEST_URI'];


            if (preg_match('#^/$|^/index\.php(?:\?|$)#', $path)) {

                if (!empty($this->front_page_react)) {
                    foreach ($this->front_page_react as $section) {

                        add_filter('frontpage_template', function ($frontpage_template) use ($section) {
                            return $this->templates->get_front_page_template($frontpage_template, $section);
                        });
                    }
                }
            }

            if (!empty($this->custom_pages_list)) {
                foreach ($this->custom_pages_list as $custom_page) {
                    if (preg_match($custom_page['regex'], $path)) {
                        add_filter('template_include', function ($template_include) use ($custom_page) {
                            return $this->templates->get_custom_page_template($template_include, $custom_page);
                        });
                    }
                }
            }

            if (!empty($this->protected_pages_list)) {
                foreach ($this->protected_pages_list as $protected_page) {
                    if (preg_match($protected_page['regex'], $path)) {
                        $filename = $protected_page['file_name'];

                        add_filter('template_include',  function ($template_include) use ($filename) {
                            return $this->templates->get_protected_page_template($template_include, $filename);
                        });
                    }
                }
            }

            if (!empty($this->pages_list)) {
                foreach ($this->pages_list as $page) {
                    if (preg_match($page['regex'], $path)) {
                        $filename = $page['file_name'];

                        add_filter('template_include', function ($template_include) use ($filename) {
                            return $this->templates->get_page_template($template_include, $filename);
                        });
                    }
                }
            }

            if (!empty($this->taxonomies_list)) {
                foreach ($this->taxonomies_list as $taxonomy) {
                    add_filter('taxonomy_template', function ($taxonomy_template) use ($taxonomy) {
                        return $this->templates->get_archive_page_template($taxonomy_template, $taxonomy);
                    });
                }
            }

            if (!empty($this->post_types_list)) {
                foreach ($this->post_types_list as $post_type) {
                    add_filter('archive_template', function ($archive_template) use ($post_type) {
                        return $this->templates->get_archive_page_template($archive_template, $post_type);
                    });
                }
            }

            if (!empty($this->post_types_list)) {
                foreach ($this->post_types_list as $post_type) {
                    add_filter('single_template', function ($single_template) use ($post_type) {
                        return $this->templates->get_single_page_template($single_template, $post_type);
                    });
                }
            }
        } catch (Exception $e) {
            $errorMessage = $e->getMessage();
            $errorCode = $e->getCode();
            $response = $errorMessage . ' ' . $errorCode;

            error_log($response . ' at load_page');

            return $response;
        }
    }

    function react_rewrite_rules()
    {
        add_rewrite_rule('^forgot/?', 'index.php?', 'top');
        add_rewrite_rule('^login/?', 'index.php?', 'top');
        add_rewrite_rule('^logout/?', 'index.php?', 'top');
        add_rewrite_rule('^signup/?', 'index.php?', 'top');
        add_rewrite_rule('^dashboard/?', 'index.php?', 'top');
        add_rewrite_rule('^founders/([a-zA-Z\-]+)/resume/?$', 'index.php?founder_name=$matches[1]', 'top');
    }
}
