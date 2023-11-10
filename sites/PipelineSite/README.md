# React Pipelines

Here's how to get up and running with development for now. Let's see if yarn will be ditched later.

First, start the transpilation watcher script. This will watch for changes in the react-pipelines directory and transpile/export it.
```bash
yarn workspace react-pipelines run build --watch
```

Second, start the web page project that will display the component
```bash
yarn workspace pipelinesite run dev 
```
