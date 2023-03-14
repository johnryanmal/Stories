# Stories
Frontend / [Backend](https://github.com/johnryanmal/stories-api#stories)

Stories is an app that lets users create interactive stories, represented as a directed graph. Made using [react-digraph](https://github.com/uber/react-digraph).

View it in action [here](https://johnryanmal.github.io/stories/)!

## Installation

1. Clone the repository
```shell
git clone https://github.com/johnryanmal/stories/
```

2. Enter the repository (Frontend)
```shell
cd stories/
```

3. [Frontend] Install dependencies
```shell
npm install
```

4. Edit the api url in `src/config.js` to work with the local backend
```js
export default {
	api: "http://localhost:3000"
}
```

## Usage

1. Start the servers

[Backend] Start rails
```shell
rails server
```

[Frontend] Start vite
```shell
npm run dev
```

2. Go to http://localhost:5173 (or wherever Vite is hosting if you have a different config)
