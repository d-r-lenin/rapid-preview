># RapidPreview
<hr>

>## <i> Discription </i>
<div style="
    margin-left:2em;
    margin-bottom:2rem;
    font-size:1.3rem
">RapidPreview is a CLI tool that provides a live preview for your HTML document while developing websites. It refreshes a webpage whenever there is change in a particular directory.</div>

>## <i>Instalation</i>
* To install first you need nodejs installed. [click here to downloat node](https://nodejs.org/en/download/)

* Type following command to install
```
    npm i -g rapidpreview
```
* Or run npx command directly
```
    npx rapidpreview@latest < arguments,>
```
>## usage
* Got to any directory that includes a html file.
* If the directory have only one html file , Simply run " ``` rapidpreview ``` "
* If you have multiple files, Then specify the filename. Like " ``` rapidpreview <file_name.html> ``` "
* If the default PORT is not available, Specify the port like " ``` rapidpreview index.html --port 5000 ``` "
* >node: If you'r using editer like VScode and wanna use integrated terminal, Then follow the steps.<br/>
  * Run "```npm init```" to create npm project.
  * In npm json file add command to a script, For Example, In Package File:<br>
    ```
    {
        "name": "my-package",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "dependencies": {}
        "devDependencies": {},
        "scripts": {
            "run-rapidpreview": "rapidpreview index.html"
        },
        "author": "-Author-name-"
    }
    ```
    In here I added a script "```run-rapidpreview```".
  * Run that script using "```npm run <script-name>```", In previous example \<script-name> is ```run-rapidpreview```.
>## Argument List

<hr>

 * ## ```--help```  <sub style="font-size:.5em">optional</sub>
    ###  To Show help
    ```
        rapidpreview --help
    ```
<hr>

* ## ``` --port ``` <sub style="font-size:.5em">optional</sub>
    ### To specify the PORT
    ```
    rapidpreview --port 3000
    ```
    default:: 4040

<hr>

* ## ``` --path ```  <sub style="font-size:.5em">optional</sub>

    ### To specify the path to watch
    ```
    rapidpreview --path "E://my_app/"
    ```
    default:: '.' (current path)

<hr>

* ## ```--file``` <sub style="font-size:.5em">optional</sub>

    ### To specify the file name
    ```
    rapidpreview --file mysite.html
    ```
    default:: <first file in the path\>

># Example
```
    rapidpreview index.html
```
```
    rapidpreview --path C://Github/myApp --file example.html --port 3000
```