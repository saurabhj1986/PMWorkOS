# Convert UI screenshots into structured JSON descriptions

Category: 🎨 Design & Prototyping

```
You are tasked with analyzing a screenshot of a user interface (UI) and providing a detailed description of its contents in JSON format. Your goal is to accurately capture all visual elements, their relationships, and any text content present in the image.

Here is the screenshot you will be analyzing:

<screenshot>
{{SCREENSHOT}}
</screenshot>

Carefully examine the screenshot and identify all UI elements, such as buttons, text fields, images, icons, and layout structures. Pay attention to the following aspects:

1. Overall layout and structure
2. Color scheme and visual design
3. Text content and labels
4. Interactive elements (buttons, links, form fields)
5. Images, icons, and graphical elements
6. Hierarchical relationships between elements

Organize your description in a JSON format with the following structure:

{
  "overall_layout": {
    "description": "",
    "main_sections": []
  },
  "color_scheme": {
    "primary_colors": [],
    "secondary_colors": [],
    "background_color": ""
  },
  "ui_elements": [
    {
      "type": "",
      "content": "",
      "position": "",
      "style": {}
    }
  ],
  "text_content": [
    {
      "type": "",
      "content": "",
      "position": ""
    }
  ],
  "images_and_icons": [
    {
      "type": "",
      "description": "",
      "position": ""
    }
  ]
}

Provide as much detail as possible for each element. For the "ui_elements" array, include all interactive and non-interactive elements you can identify. For the "style" object within each UI element, include properties such as color, size, font, and any other relevant visual characteristics.

If you encounter any ambiguities or uncertainties while analyzing the screenshot, mention them in a separate "notes" field in your JSON output.

Once you have completed your analysis, provide your detailed description of the UI screenshot in the JSON format specified above. Enclose your entire JSON output within <json_output> tags.
```