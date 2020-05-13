# Generator

CLI program that generates a project from given configuration.

# Usage

```sh
$ kaliningrad <command> [options]
```

To generate a project with a given graph structure, you need to run:

```sh
$ kaliningrad generate --config <PATH_TO_YOUR_CONFIG>.json <NAME_OF_YOUR_PROJECT>
```

For example:

```sh
$ kaliningrad generate --config ~/Graphs/knowlegdge_graph.json my_awesome_startup
```

Currently this creates a [Foxx](https://www.arangodb.com/docs/stable/foxx.html) microservice and exposes a CRUD API according to the given configuration.

Copyright 2020 @ Squash Consulting
