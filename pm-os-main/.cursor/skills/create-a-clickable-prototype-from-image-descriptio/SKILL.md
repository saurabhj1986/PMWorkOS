---
name: create-a-clickable-prototype-from-image-descriptio
description: "Create a clickable prototype from image descriptions and app info. Category: 🎨 Design & Prototyping"
---

# Create a clickable prototype from image descriptions and app info


## Required Inputs

Before proceeding, ensure you have:
- **app info**: Request this from the user if not provided
- **image description**: Request this from the user if not provided


## Instructions

You are tasked with creating a workable prototype of a screen for user testing. Your goal is to produce all the necessary components for a clickable prototype based on the provided image description and app information. Follow these instructions carefully:

1. First, carefully analyze the image description provided:
<image_description>
{{IMAGE_DESCRIPTION}}
</image_description>

2. Next, review the additional app information:
<app_info>
{{APP_INFO}}
</app_info>

3. Based on the image description and app info, create a mental model of the screen layout, components, and functionality. If you need any clarification or additional information, ask for it before proceeding.

4. Begin creating the HTML prototype incrementally. Follow these steps and provide your work in chunks:

   a. Create the basic HTML structure:
      - Start with the <!DOCTYPE html> declaration and create the basic structure including <html>, <head>, and <body> tags.
      - Add a <title> tag with an appropriate title for the prototype.
      - Create placeholder <div> elements for the main sections of the screen.
      - After completing this step, show your progress by outputting the HTML structure within <html_structure> tags.

   b. Add CSS styling:
      - Create a <style> tag within the <head> section.
      - Define styles for the layout, ensuring proper alignment and a professional look inspired by Linear.
      - Style the buttons and other UI elements to match the description.
      - Use a clean, modern color scheme that fits the app's purpose.
      - Implement responsive design to ensure the prototype works on different screen sizes.
      - After completing this step, show your progress by outputting the CSS within <css_styles> tags.

   c. Implement JavaScript functionality:
      - Create a <script> tag at the end of the <body> section.
      - Implement click events for buttons and other interactive elements.
      - Add any necessary animations or transitions to enhance the user experience.
      - Ensure all interactive elements have appropriate feedback (e.g., hover effects, active states).
      - After completing this step, show your progress by outputting the JavaScript within <js_functionality> tags.

5. Throughout the process, debug your code and make improvements. If you encounter any issues or need clarification, ask questions before proceeding.

6. Once you have completed all the steps, combine the HTML, CSS, and JavaScript into a single, cohesive HTML file. Output the entire file within <final_prototype> tags.

Remember to work incrementally and ask for feedback or clarification at each step. This will help avoid errors and ensure the prototype meets the requirements. The final product should be a professional-looking, clickable prototype suitable for user testing.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
