javascript-masterpage
=====================

It is a simulation of asp.net masterpage using only javascript and ajax calls

To use it:


-> create a masterpage using html
-> insert the code [% content_id %] where you want to inject your content
-> create your inner pages using:

  ->this script.
    
    <script id="masterpage-plugin"
    	url="Your master page URL"
    	type="text/javascript" src="master-plugin.js"></script>
    
    where:
      - You must set up id as masterpage-plugin
      - You must put a url of your master page with the right codes
      
    
    	
    	
    -> For wich content id you have create at master page use a tag:
    
        <content id="content_id">
          Insert your HTML to inject in your master page here!
        </content>
        
        
    IMPORTANT: You must declare these tags for each content_id you have created even if you want to keep it empty
