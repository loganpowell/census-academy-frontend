# Create Once Publish Everywhere (COPE) / Reimagining Census Academy

The U.S. Census Bureau is home to a wide and diverse array of products and services that empower the American people by providing quality, timely data on the most relevant issues of the day. Yet, many individuals do not know where or how to access these data themselves, or how they might generate insight from them. Census Academy addresses this problem by providing educational resources on the kinds of data available and how to access them, and promotes helpful tools that leverage U.S. Census Bureau data. Create Once Publish Everywhere (COPE)/Reimagining Census Academy hopes to expand on the great work already being done at the U.S. Census Bureau by providing a low-cost, flexible, built-with-modern-tooling platform that allows for more engaging educational and digital experiences.

## Live Demo

-   https://loganpowell.github.io/census-academy-frontend/

## Tech Stack

-   [AWS Amplify](https://aws.amazon.com/amplify/)
-   [React](https://reactjs.org/)
-   [Ant Design](https://ant.design/)

## Running this project locally

**Pre-reqs**

-   Install [Node.js](https://nodejs.org/en/) on your machine. Confirm you have installed it correctly and have `node package manager` from the command line by running: `npm -v` in the terminal of your choice
-   Install [Git](https://git-scm.com/downloads) on your machine. Confirm you have installed it correctly by running `git --version` in your command line.

**Local Installation**

1. `git clone git@github.com:tnguyen21/cope-frontend-mockup.git`
2. `cd cope-frontend-mockup`
3. `npm install`
4. `npm start`

If you don't run into errors running the commands above, then the application should open up in a browser @ `localhost:3000/`. Happy developing!

## Deploying this project to GH pages

To update the demo with the most recent changes, please follow the steps below.

1. Navigate to this project directory on your local machine.
2. `git checkout -b misc/build-and-deploy`
3. `npm install`
4. `npm run build` _Note, this build process takes a while and will produce a lot of changes to `docs`_
5. `git add .` _Add all the changed files from `docs`_
6. `git commit`
7. `git push -u origin misc/build-and-deploy`
8. Create a pull request on [GitHub](https://github.com/loganpowell/census-academy-frontend) to `main` of `loganpowell/census-academy-frontend`
9. Once the pull request has been merged, GitHub pages will kickoff the deployment process.

At this point, [check deployments on GitHub pages](https://github.com/loganpowell/census-academy-frontend/deployments/activity_log?environment=github-pages) to ensure that the build has finished building and deploying to GitHub pages.

_Note: Creating a new branch for the build and merging it back to main is to trigger the GitHub pages build and deploy process_
