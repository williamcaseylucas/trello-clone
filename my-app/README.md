# install

- npx shadcn-ui@latest init
- npx shadcn-ui@latest add button
- yarn add @clerk/nextjs
- yarn add usehooks-ts (typesafe hooks)
- npx shadcn-ui@latest add skeleton
- npx shadcn-ui@latest add accordion
- npx shadcn-ui@latest add separator

# Cal.com unique fonts

# Shadcn

- Good for error and success states
- component library that works well with next14
- add "asChild" for Button to make sure Link still works
- cn allows you to append additional fonts to pre-existing components
- Added 'primary' variant to button component
- Accordian trigger has chevron down in component!

# nextjs 14

- folder -> url
- [name] -> dynamic url
- (name) -> exclude from urls
- \_name -> anything inside is excluded
- add images to next.config.js through remotePatterns

# tailwind

- shrink-0 makes sure the width never expands beyond the point you define
- ml-auto pushes it to the right

# Create config

- For header name and description

# Gitignore

- add .env extension

# Clerk

- Add ClerkProvider to (platform) portion
- Add middleware.ts to root of application
- auth is a ss component

# Components

- Use org-control to check url and update based on the correct url
- organizationId is because of our folder name
- sidebar + navitem are how we are rendering sidebar
