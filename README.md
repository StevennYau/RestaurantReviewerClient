# Restaurant Reviewer

"Restaurant Reviewer" is a web application that allows users to browse, rate and save restaurants in the Toronto/Markham Area. This project's frontend uses Angular and Angular Material which creates a slick and responsive user interface. In addition, Google maps is used to show the location in each restaurant's detail page. User and restaurant data is saved into a MySQL database. Restaurant data is taken from the Yelp web API.

## Frontend Dependancies
The dependencies used in this project and that should be installed are:
```
"@angular/animations": "^11.2.3",
"@angular/cdk": "^11.2.2",
"@angular/common": "~11.2.1",
"@angular/compiler": "~11.2.1",
"@angular/core": "~11.2.1",
"@angular/flex-layout": "^11.0.0-beta.33",
"@angular/forms": "~11.2.1",
"@angular/material": "^11.2.2",
"@angular/platform-browser": "~11.2.1",
"@angular/platform-browser-dynamic": "~11.2.1",
"@angular/router": "~11.2.1",
"@fortawesome/fontawesome-free": "^5.15.2",
"@types/chart.js": "^2.9.31",
"@types/googlemaps": "^3.39.13",
"angular-bootstrap-md": "^11.0.0",
"animate.css": "^4.1.1",
"chart.js": "^2.5.0",
"hammerjs": "^2.0.8",
"rxjs": "~6.6.0",
"tslib": "^2.0.0",
"zone.js": "~0.11.3"
```

## Database Models
### Business
```java
public class Business {
    @Id
    @GeneratedValue
    private int id;
    private String alias;
    private String name;
    private String image_url;
    private boolean is_closed;
    private String url;
    private int review_count;
    private int rating;
    private String phone;
    private int address_id;
}
```
```java
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min=3, max = 50)
    private String name;

    @NotBlank
    @Size(min=3, max = 50)
    private String username;

    @NaturalId
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min=6, max = 100)
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
 }
 ```
