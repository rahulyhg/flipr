## iPhone Flip Effect using Unobtrusive Javascript with CSS3 Transforms

### Demo

To see flipr in action visit the [demo](http://mayankbpatel-flipr.aws.af.cm/flipr_demo.html) site
or download this repo and run the sinatra application: **rackup config.ru**


### Flip on Click
Here is the necessary markup:

```
<div id="bicycle_ghost_card" data-flipr-container>
  <div id="bicycle_card_front" data-flipr-front></div>
  <div id="bicycle_card_back"  data-flipr-back></div>
</div>
```

The outer div contains the **flipr-container** data-attribute and can be
styled to suit your specific application needs.

Each side of the card is marked with the respective data-attributes:
**flipr-front** or **flipr-back**.

Both cards can be given IDs, classes, styled independently and declared in any order.

To activate a flip action on a click, just attach the **flip-on-click** data-attribute
to an element such as a button and provide a valid jquery selector that resolves to 
the target **flipr-container**:
       
    <button data-flip-on-click="#bicycle_ghost_card">Click to Flip</button>

### Flip on Hover

To flip on hover, just add the data-attribute: **flip-on-hover** to the flipr container: 

```
<div id="cat_daddy_example" data-flipr-container data-flip-on-hover>
  <div data-flipr-front> Cat Daddy </div>
  <div data-flipr-back> YouTube Video Goes Here </div>
</div>
```
 
### Javascript Incantation

To enable the flip effect, you will need a sprinkle of javascript.

In the document loader callback create a new instance of **Flipr.Effect** 
and invoke **applyTo** with a jquery DOM selector as an argument:

```
$(document).ready(function() {
  var flipr = new Flipr.Effect();
  flipr.applyTo('body');
});
```

The good news is that **applyTo** is idempotent, which means that you
can repeatedly invoke it in a handler function against dynamic DOM
elements without worry of side-effects!

### License

This work consists of a stylesheet file: **flipr.css** and a CoffeeScript file: **flipr.coffee**.
          
If you don't have access to a CoffeeScript compiler feel free to use the compiled javascript file: **flipr.js**

All 3 files are being released under the [MIT License](http://opensource.org/licenses/mit-license.php/).

### Download

The source files are located in the releases subdirectory.
      
### Credits

Many thanks to David Desandro.  This work drew heavily from his [explanation](http://desandro.github.com/3dtransforms/) of CSS3 3D transforms.
