# hamson.tech

Source code for [hamson.tech](https://hamson.tech), the independent website of Neil Hamson.

The site presents my work in software engineering, Machine Intelligence, Bitcoin and related technical development.

## Technology

- Next.js App Router
- React
- TypeScript
- CSS
- Responsive desktop and mobile layouts
- Static and server-rendered application routes
- Automated lint and production-build validation

## Current application

The repository contains the source for the live hamson.tech website, including:

- homepage and navigation
- Machine Intelligence section
- MI1 development presentation
- public code-review demonstration interface
- development record
- Bitcoin material
- software engineering services
- articles
- about and contact pages
- SEO, sitemap and robots configuration
- responsive styling and branding assets

## MI1

MI1 is a private Machine Intelligence software system under active development.

The website includes public-facing material explaining selected aspects of that work, including human-reviewed development, bounded tools, validation and controlled software changes.

A complete controlled MI1 development cycle has been demonstrated on an external software repository:

1. inspect the repository and task
2. prepare a bounded change proposal
3. require explicit human approval
4. apply the approved change
5. run repository validation
6. create a controlled local Git commit

The MI1 core source code is not part of this repository.

A separate public evidence repository is being prepared for technical records, demonstrations and selected reproducible evidence without exposing the private MI1 implementation.

## Development approach

Changes to this project are developed under source control and validated before release.

The normal engineering workflow includes:

1. inspect the current source
2. define a bounded change
3. review the resulting diff
4. run lint validation
5. run a production build
6. commit the validated source
7. deploy separately to production
8. verify the live result

MI1 is also being developed to participate in this workflow while retaining explicit human authority over consequential actions.

## Repository purpose

This repository is public so that the implementation of hamson.tech and the progression of my software-development work can be inspected directly.

It is not intended to expose:

- MI1 private source code
- private evaluation or training data
- API credentials
- production server credentials
- internal infrastructure configuration
- unrestricted deployment authority

## Author

Neil Hamson

BSc (Hons) Computing  
PhD Computer Science

[hamson.tech](https://hamson.tech)
