# install

- npx shadcn-ui@latest init
- npx shadcn-ui@latest add button
- yarn add @clerk/nextjs
- yarn add usehooks-ts (typesafe hooks)
- npx shadcn-ui@latest add skeleton
- npx shadcn-ui@latest add accordion
- npx shadcn-ui@latest add separator
- npx shadcn-ui@latest add input
- npx shadcn-ui@latest add label
- npx shadcn-ui@latest add textarea
- yarn add zustand
- npx shadcn-ui@latest add sheet
- npx shadcn-ui@latest add tooltip (question mark hover)
- npx shadcn-ui@latest add popover
- yarn add -D prisma
- yarn add @prisma/client
- yarn add zod
- yarn add sonner
- yarn add unsplash-js
- yarn add lodash (allows us to change tab title to reflect page)

# unsplash.com/developers

- Signup and you get access key and secret key
- /constants folder with images.ts as fallback for when we surpass 50 free requests
  - open network tab
  - select all
  - search for random
  - copy response and paste it
- use input with type='radio' that is hidden but will act as a trigger for our form (this will have an id of 'image')
  - have value with image id | img thumb | img full | img html | img user name
    - This will be stored in our db
    - Will be split by pipes

# images

- Often images are position relative and the Image from next/link has object-cover

# Prisma

- init
  - yarn prisma init
- create and push
  - yarn prisma generate
  - yarn prisma db push
- run primsa studio
  - yarn prisma studio
- to reset
  - yarn prisma migrate reset
- import from @prisma/client for types
- looks at dashboard/board/bordid/page.tsx to see reference of grabbing lists from db
- types.ts in root for ListWithCards and CardsWithList since both will be fetched from db simultaneously

# Planetscale

# Cal.com unique fonts

# Toast

- Add to layout.tsx at same level as ClerkProvider

# Shadcn

- Good for error and success states
- component library that works well with next14
- add "asChild" for Button to make sure Link still works
- cn allows you to append additional fonts to pre-existing components
- Added 'primary' variant to button component
- Accordian trigger has chevron down in component!
- Added PopoverClose to popover.tsx

# nextjs 14

- folder -> url
- [name] -> dynamic url
- (name) -> exclude from urls
- \_name -> anything inside is excluded
- add images to next.config.js through remotePatterns
- add %s among other values in meta data in orignial layout and then you can export generateMetadata() in any SSR component and return some 'title' string and have it dynamically render if you have a 'title' component in your base layout
- Layout has children and params where params has id based on folder name
- router.refresh(); // so we refetch server components

# drag and drop

- Could do it all on the server but that would result in bad user experience so we will use useState on data to have 'optimistic' version that updates correctly

# react

- Can use ref to click a button that makes popup go away after some desired action occurs
- Wrap loading skelton in Suspense to be used as a 'fallback'
  - example in org/orgId page.tsx with BoardList

# Nextjs SSR

- Can now create server components within server-side rendered applications by using 'use server'
- Can use revalidatePath() to refetch when update occurs
- Created unique hook useAction to simulate useMutation that reactQuery gives you

# tailwind

- shrink-0 makes sure the width never expands beyond the point you define
- ml-auto pushes it to the right
- For images in div
  - relative min-h-screen bg-no-repeat bg-cover bg-center
  - then add div inside of it with: relative inset-0 bg-black/10
- For icons
  - have h-auto w-auto and potentialy absolute positioning with top-2 right-2
  - have child element with icon be h-4 w-4

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
- Add NavItem.Skeleton inside of navbar to generate silouette of loading area

# Server Actions (all around create-safe-action.ts)

- types.ts (input and output)
- schema.ts (ZOD validation)
- index.ts (handler)

# typescript

- Add '!' to end of src={} on error 'undefined is not assinable'

# How custom hook use-action works

- You get execute, and fieldErrors returned from /hooks
- useAction takes an action (createBoard from index.ts which validates user is signed in and then attempts to create a board), and then options such as onSuccess, onError, onComplete which we define during the runtime of the hook
- index.ts has a schema defined with zod and types defined as well
- /lib has a 'createSafeAction' file where FieldErrors and ActionState are defined
- a schema and handler are required for createSafeAction, but this is used in index.ts
- execute is a callbackFunction that can be initiated by user
- execute is called on a form submitting when a formInput has an id of 'title'
