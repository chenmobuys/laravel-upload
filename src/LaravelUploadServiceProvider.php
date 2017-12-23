<?php

namespace Chenmobuys\LaravelUpload;


use Illuminate\Support\ServiceProvider;

class LaravelUploadServiceProvider extends ServiceProvider
{
    /**
     * @var array
     */
    protected $commands = [
    ];

    /**
     * The application's route middleware.
     *
     * @var array
     */
    protected $routeMiddleware = [

    ];

    /**
     * The application's route middleware groups.
     *
     * @var array
     */
    protected $middlewareGroups = [

    ];

    public function boot()
    {
        if (file_exists($routes = __DIR__ . '/../routes/routes.php')) {
            $this->loadRoutesFrom($routes);
        }
    }

    public function register()
    {
        $this->registerRouteMiddleware();

        $this->commands($this->commands);
    }

    /**
     * Register the route middleware.
     *
     * @return void
     */
    protected function registerRouteMiddleware()
    {
        // register route middleware.
        foreach ($this->routeMiddleware as $key => $middleware) {
            app('router')->aliasMiddleware($key, $middleware);
        }

        // register middleware group.
        foreach ($this->middlewareGroups as $key => $middleware) {
            app('router')->middlewareGroup($key, $middleware);
        }
    }
}