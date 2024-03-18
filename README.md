# Focus Nest App 

HERE THE PICTURES

This is my fifth milestone project for the Code Institute Full Stack Web Development Course. The objective of this project is to develop a Full-Stack web application using Django (DRF) for the backend and React for the frontend.

Focus Nest aims to enhance user productivity by providing a comprehensive tool for managing tasks and goals, offering the ability to organize tasks into 'collections' for better grouping.

* [Deployed Frontend](https://focus-nest-1f84ad6cf300.herokuapp.com/)
* [Deployed Backend](https://focus-nest-api-a8aee1208ee3.herokuapp.com/) 


## UX

Paragraph about the design/ ux. Short description.

### Design

When I designed the app I wanted to create a calming, easy to use and understand user interface.
The color palette is sublte and is consistent through-out the app. 
When it comes to styling, I used the react-bootstrap to speed up the process, and on top of that I added and modified styles to match my vision of the website.
The navigation is intuitive, the user has also access to the navbar at all times. On smaller screen sizes it collapses to not interfere with other UI elements.


### Color palette

![coolors](./documentation/FocusNest%20Coolors.png)


### Typography

Nunito is this project's font. It's a sans-serif typeface designes by Vernon Adams. It's rounded letterforms give it a warm and friendly feeling, which nicely harmonizes with the calm color palette of the app. 

### User Sories

For detailed user stories feel free to visit the [Kanbar Board](https://github.com/users/KarolSU96/projects/3) of the project.


## Features

The FocusNest is easy to use task management application. Which provides the user with comprehensive experience to manage his/ hers tasks.
Every user has also access to the profile statistics page and can enchance their experience by changing their profile image.
The app provides full CRUD functionality for the tasks and collections. Both of them are easily searchable through the searchbar.
All of the users can contact admin for additional help or provide the feedback for the improvements.

## Future Features

Won't have stories described here.

## Components

Document theresuable components and their function.Explain that I reused the css for cards. Can refactor this styles in the future for better naming

### Navbar
 Navbar is a navigation componant that displays the icons that when clicked, forward the user to the different pages. It logged in and logged out users see different navbar layout. From navbar user can also add new tasks - which enables him addid tasks from every page of the website. Navbar is used in every page of the website.

### Avatar 
 Avatar is user profile image component that is displayed inside the Navbar component.

### DotsDropdown
 Three dots dropdown compoenent. In this project it provides the edit and delete dropdown buttons.

### LoadingSpinner
 Loading spinner displays before the data is fetched on the pages, aswell as during the use of the searchbar.

### PageNotFound
 Informs user that he laded on a unknown url.

### SignUpForm
Users can register there and are welcomed with a encouraging image.

### SignInForm
Page where users can log in with their credentials.





### Task 
 Core component of the app. Users can delete and edit task based on it's id. 
 The user can add Task's:
 - Title
 - Priotiry- the user can chooose between: low, medium, high
 - Mark as done Checkbox
 - Due Date
 - Notes

 The Task component is used inside:
 * Task Create Form this where the Tasks are crated
 * Home / Tasks Page, which is where all of the tasks that are not completed are listed inside of the infinite scroll element. 
 * Task Edit Form page component that encorporated Task which takes the task by the ID and enables it's edit.
 * Task Detail Page - this page is used to display the single tasks. It is not accessible through the ui, because the user sees every detail of the task inside of the HomeTasksPage, can be accessed by the url modification. Useful for admins whenever he would like to check how the actual task look like outside of the admin panel.



### Collection
Collection component enables users to group the tasks together. 
The users can add Collection's:
- Title
- Due date
- Description
- Tasks 

The Collection component is used inside:
* Collection Create Form- where user can create new collection
* Collections Page- where all of the collections are listed
* Collection Detail Page- collection details and all of collection's taks are listed inside a infinite loop
* Collection Edit Form- where users can edit the collection details




### Profile 
Profile is a page component. There was not point in creating a modular one for this model, because there is only one page that displays it and second, edit form which would not benefit from use of modular component. 
Here the user can change the profile image and add his/hers goals. 


### Contact Form
Contact form displays for every user, whether someone is logged in or not. The users can contact the admin / crew of the site for support/ improvement ideas/ report any bugs.

### 

## Bugs and Errors

Explain the problems that I encountered and that I still encounter.

## Technologies used
- React 
- React DOM: Gives access to DOM methods that can be used at top level of the app to render the components.
- React Router DOM: Enables routing for React applications.
- React Bootstrap: UI framework for React applications.
- React Infinite Scroll Component: A React compontnt for infinite scrolling (tasks, collections).
- Axios: A promise-based HTTP client.
- Date-fns: A date utility library.
- JWT Decode: A library to decode JWT tokens
- ESLint: JavaScript code quality checker

### Enviroment
- Node: v20.10.0
- npm: v10.2.3

## Testing

Paste the testing table with the tests that were done.




