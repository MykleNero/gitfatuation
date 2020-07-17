# Frontend Engineer Challenge (2-5 hrs)

Thanks for trying our development challenge! Let's get started.

### The Challenge

We ask that you write a web application capable of the following:

- Search your favorite repositories from Github and select them from a dropdown
    - List item should have name, description, language, and stars visible
- Save them to the server by using the `reposerver` API
- App should have a list view where you are able to sort your favorites by stars (`stargazers_count`) and created date (`created_at`)
    - Up to 10 repositories may be saved for a user
    - Repositories should be removable or added
- If the page is refreshed, the saved repositories should populate the list so long as the server is running.

GitHub API (https://developer.github.com/v3/)

UX Requirements:
- Search input for Github repositories should be an autocomplete dropdown


**NOTE** Please treat this as an opportunity to show off, and let us see how you would write and visually present something that you'd be proud of! There is no one "correct" answer.

### The Server

**IMPORTANT**: The server is written to store repositories in memory; as such, should you restart/kill the Docker container you will lose your "database"!

#### A few endpoints

- `GET health` health check
- `GET repo` list all repositories
- `DELETE repo/[repoID]` delete a repo
- `POST repo` create a repository

**NOTE:** Ensure that your API calls (except the `/health` enpoint) have a trailing slash the end. For example, `curl http://localhost:8080/repo/`

#### The Repository object

- id: 1 (string, required) - The unique identifier for a product
- fullName: ethereum/go-ethereum (string, required) - Name of the repository
- stargazersCount: 12 (number, required) - Number of stargazers
- language: ethereum/go-ethereum (string, required) - Programing language
- url: https://api.github.com/repos/ethereum/go-ethereum (string, required) - URL of the repository
- createdAt: 2013-12-26T13:05:46Z (string, required) - CreatedAt of repository


#### JSON

```json
    {
      "id": "15452919",
      "fullName": "ethereum/go-ethereum",
      "createdAt": "2013-12-26T13:05:46Z",
      "stargazersCount": 26012,
      "language": "Go",
      "url": "https://api.github.com/repos/ethereum/go-ethereum"
    }
```


### Running the server

```
$ docker run -p 8080:8080 gcr.io/hiring-278615/reposerver
```

```bash
2020/02/05 11:09:44 listening on port 8080
```

### Your Solution

Your code should build and run on a Mac (or GNU/Linux machine) running a recent OS. **Containerized solutions are mandatory** and should be runnable via Docker.

Third-party libraries are permitted; however, as our intent is to come to understand your design choices, we ask for a short description of the rationale of your choices.

### Before submitting your code

We expect you to make sure that your solution works with `reposerver` and the Github v3 API before sending it to us.

### Acceptance Criteria

We look for code to be well-factored, follow good practices, and be tested.

What we will look for:

- Does your code fulfill the requirement and successfully run against both `reposerver` and the Github v3 API?
- How clean is your design? How easy is it to understand, maintain, or extend your code?
- How did you verify your software, if by automated tests or by other means? How much application code is covered?
- How did you handle empty data states?
- What kind of documentation did you ship with your code?
- How cleanly assembled is your container?

### Housekeeping notes
- If you run into any issues building the GCR image, please contact us immediately
- Please feel free to make assumptions, but ensure to note them

Good luck!
