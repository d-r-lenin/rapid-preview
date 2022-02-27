># O HTML \(ohtml\)
<hr>

>## <i> Discription </i>
<div style="
    margin-left:2em;
    margin-bottom:2rem;
    font-size:1.3rem
">Ohtml is a CLI tool that provides a live preview for your HTML document while developing websites. It refreshes a webpage whenever there is change in a particular directory.</div>

>## <i>Instalation</i>
* To install first you need nodejs installed. [click here to downloat node](https://nodejs.org/en/download/)

* Type following command to install
```
    npm i -g ohtml
```
* Or run npx command directly
```
    npx ohtml@latest < arguments,>
```
>## usage
* Got to any directory that includes a html file.
* If the directory have only one html file , Simply run " ``` ohtml ``` "
* If you have multiple files, Then specify the filename. Like " ``` ohtml <file_name.html> ``` "
* If the default PORT is not available, Specify the port like " ``` ohtml index.html --port 5000 ``` "
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
            "run-ohtml": "ohtml index.html"
        },
        "author": "-Author-name-"
    }
    ```
    In here I added a script "```run-ohtml```".
  * Run that script using "```npm run <script-name>```", In previous example \<script-name> is ```run-ohtml```.
>## Argument List

<hr>

 * ## ```--help```  <sub style="font-size:.5em">optional</sub>
    ###  To Show help
    ```
        ohtml --help
    ```
<hr>

* ## ``` --port ``` <sub style="font-size:.5em">optional</sub>
    ### To specify the PORT
    ```
    ohtml --port 3000
    ```
    default:: 4040

<hr>

* ## ``` --path ```  <sub style="font-size:.5em">optional</sub>

    ### To specify the path to watch
    ```
    ohtml --path "E://my_app/"
    ```
    default:: '.' (current path)

<hr>

* ## ```--file``` <sub style="font-size:.5em">optional</sub>

    ### To specify the file name
    ```
    ohtml --file mysite.html
    ```
    default:: <first file in the path\>

># Example
```
    ohtml index.html
```
```
    ohtml --path C://Github/myApp --file example.html --port 3000
```