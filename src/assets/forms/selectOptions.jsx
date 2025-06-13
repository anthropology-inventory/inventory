/**
 * @file formOptions.jsx
 * @description Contains reusable select/dropdown options for forms across the application.
 * These options are used to populate selection fields such as country, storage location, material, etc.
 *
 * @author Giovan Cervantes
 *
 * @note To update a dropdown list (e.g., countries), make changes here and ensure the related UI components re-import this file.
 *
 * @see Used in: FossilForm.jsx and other components using <Select> or <Autocomplete>
 */

/**
 * An array of category options used for artifact classification in a dropdown menu.
 * Each option includes a value, a display label, and optionally a disabled state.
 *
 * @constant
 * @type {Array<Object>}
 * @property {string} value - The internal value used for the category.
 * @property {string} label - The human-readable label for the category.
 * @property {boolean} [isDisabled] - Optional flag to disable the option in the UI.
 *
 * @example
 * // Usage with a select component:
 * <Select options={categoryOptions} />
 */
export const categoryOptions = [
  { value: 'Fossil', label: 'Fossil' },
  { value: 'Pottery', label: 'Pottery', isDisabled: true },
  { value: 'Weaponry', label: 'Weaponry', isDisabled: true },
  { value: 'Tool (non-weaponry)', label: 'Tool (non-weaponry)', isDisabled: true },
  { value: 'Stone Tool', label: 'Stone Tool', isDisabled: true }
]

/**
 * An array of location options representing where artifacts are stored.
 * Each option includes a value used internally and a label for display in the UI.
 *
 * @constant
 * @type {Array<Object>}
 * @property {string} value - The internal identifier for the storage location type.
 * @property {string} label - The user-friendly name shown in the interface.
 *
 * @example
 * // Usage with a select component:
 * <Select options={locationOptions} />
 */
export const locationOptions = [
  { value: 'cabinet-row', label: 'Cabinet & Row' },
  { value: 'drawer', label: 'Drawer' },
  { value: 'shelf', label: 'Shelf' }
]

/**
 * A grouped array of selectable storage location options for cabinets and rows.
 * Each group has a label (e.g., "Cabinets" or "Row") and an array of corresponding options.
 * This structure is commonly used in UI components like grouped dropdowns or selects.
 *
 * @constant
 * @type {Array<Object>}
 * @property {string} label - The name of the group (e.g., "Cabinets", "Row").
 * @property {Array<Object>} options - The list of selectable items within each group.
 * @property {string} options[].value - The internal value representing the option.
 * @property {string} options[].label - The display name shown to users in the UI.
 *
 * @example
 * // Used in a grouped select component:
 * <Select options={cabinetAndRowOptions} isGrouped />
 */
export const cabinetAndRowOptions = [
  {
    label: 'Cabinets',
    options: [
      { value: 'Cabinet 1', label: 'Cabinet 1' },
      { value: 'Cabinet 2', label: 'Cabinet 2' },
      { value: 'Cabinet 3', label: 'Cabinet 3' },
      { value: 'Cabinet 4', label: 'Cabinet 4' },
      { value: 'Cabinet 5', label: 'Cabinet 5' },
      { value: 'Cabinet 6', label: 'Cabinet 6' },
      { value: 'Cabinet 7', label: 'Cabinet 7' },
      { value: 'Cabinet 8', label: 'Cabinet 8' },
      { value: 'Cabinet 9', label: 'Cabinet 9' },
      { value: 'Cabinet 10', label: 'Cabinet 10' }
    ]
  },
  {
    label: 'Row',
    options: [
      { value: 'Row 1', label: 'Row 1' },
      { value: 'Row 2', label: 'Row 2' },
      { value: 'Row 3', label: 'Row 3' },
      { value: 'Row 4', label: 'Row 4' },
      { value: 'Row 5', label: 'Row 5' },
      { value: 'Row 6', label: 'Row 6' }
    ]
  }
]

/**
 * A list of selectable drawer locations for artifact storage.
 * Each item contains a value and a label for use in dropdown menus or form components.
 *
 * @constant
 * @type {Array<Object>}
 * @property {string} value - The internal value representing the drawer identifier.
 * @property {string} label - The human-readable label shown in the UI.
 *
 * @example
 * <Select options={drawerOptions} />
 */
export const drawerOptions = [
  { value: 'Drawer 1', label: 'Drawer 1' },
  { value: 'Drawer 2', label: 'Drawer 2' },
  { value: 'Drawer 3', label: 'Drawer 3' },
  { value: 'Drawer 4', label: 'Drawer 4' },
  { value: 'Drawer 5', label: 'Drawer 5' },
  { value: 'Drawer 6', label: 'Drawer 6' },
  { value: 'Drawer 7', label: 'Drawer 7' },
  { value: 'Drawer 8', label: 'Drawer 8' },
  { value: 'Drawer 9', label: 'Drawer 9' },
  { value: 'Drawer 10', label: 'Drawer 10' },
  { value: 'Drawer 11', label: 'Drawer 11' },
  { value: 'Drawer 12', label: 'Drawer 12' }
]

/**
 * A list of known artifact manufacturers or sources.
 * Used to tag specimens with their origin for tracking or cataloging purposes.
 *
 * @constant
 * @type {Array<Object>}
 * @property {string} value - The internal value for the manufacturer.
 * @property {string} label - The display label shown in the UI.
 *
 * @example
 * <Select options={manufacturerOptions} />
 */
export const manufacturerOptions = [
  { value: 'Bones Clones', label: 'Bones Clones' },
  { value: 'Skulls Unlimited', label: 'Skulls Unlimited' },
  { value: 'Other', label: 'Other' },
  { value: 'Unknown', label: 'Unknown' }
]

/**
 * A list of possible materials used in the creation or preservation of artifacts.
 * Helps identify or categorize specimens by their composition.
 *
 * @constant
 * @type {Array<Object>}
 * @property {string} value - The internal value for the material type.
 * @property {string} label - The name shown in UI dropdowns or forms.
 *
 * @example
 * <Select options={materialOptions} />
 */
export const materialOptions = [
  { value: 'Bone', label: 'Bone' },
  { value: 'Plaster', label: 'Plaster' },
  { value: 'Polyurethane Resin', label: 'Polyurethane Resin' },
  { value: 'Polyester Resin', label: 'Polyester Resin' },
  { value: 'Other', label: 'Other' },
  { value: 'Unknown', label: 'Unknown' }
]

/**
 * A comprehensive list of countries formatted for use in dropdown menus or selection components.
 * Each country is represented as an object with a `value` and a `label`, both containing the country name.
 * This array is useful for forms requiring user input of nationality, place of origin, or location-based metadata.
 *
 * @constant
 * @type {Array<Object>}
 * @property {string} value - The internal value representing the country (typically the full country name).
 * @property {string} label - The user-facing label shown in the UI (also the country name).
 *
 * @example
 * <Select options={countryOptions} placeholder="Select a country" />
 */
export const countryOptions = [
  { value: 'Afghanistan', label: 'Afghanistan' },
  { value: 'Åland Islands', label: 'Åland Islands' },
  { value: 'Albania', label: 'Albania' },
  { value: 'Algeria', label: 'Algeria' },
  { value: 'American Samoa', label: 'American Samoa' },
  { value: 'Andorra', label: 'Andorra' },
  { value: 'Angola', label: 'Angola' },
  { value: 'Anguilla', label: 'Anguilla' },
  { value: 'Antarctica', label: 'Antarctica' },
  { value: 'Antigua and Barbuda', label: 'Antigua and Barbuda' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Armenia', label: 'Armenia' },
  { value: 'Aruba', label: 'Aruba' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Austria', label: 'Austria' },
  { value: 'Azerbaijan', label: 'Azerbaijan' },
  { value: 'Bahamas', label: 'Bahamas' },
  { value: 'Bahrain', label: 'Bahrain' },
  { value: 'Bangladesh', label: 'Bangladesh' },
  { value: 'Barbados', label: 'Barbados' },
  { value: 'Belarus', label: 'Belarus' },
  { value: 'Belgium', label: 'Belgium' },
  { value: 'Belize', label: 'Belize' },
  { value: 'Benin', label: 'Benin' },
  { value: 'Bermuda', label: 'Bermuda' },
  { value: 'Bhutan', label: 'Bhutan' },
  { value: 'Bolivia', label: 'Bolivia' },
  { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
  { value: 'Botswana', label: 'Botswana' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'British Indian Ocean Territory', label: 'British Indian Ocean Territory' },
  { value: 'British Virgin Islands', label: 'British Virgin Islands' },
  { value: 'Brunei', label: 'Brunei' },
  { value: 'Bulgaria', label: 'Bulgaria' },
  { value: 'Burkina Faso', label: 'Burkina Faso' },
  { value: 'Burundi', label: 'Burundi' },
  { value: 'Cambodia', label: 'Cambodia' },
  { value: 'Cameroon', label: 'Cameroon' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Cape Verde', label: 'Cape Verde' },
  { value: 'Cayman Islands', label: 'Cayman Islands' },
  { value: 'Central African Republic', label: 'Central African Republic' },
  { value: 'Chad', label: 'Chad' },
  { value: 'Chile', label: 'Chile' },
  { value: 'China', label: 'China' },
  { value: 'Christmas Island', label: 'Christmas Island' },
  { value: 'Cocos Islands', label: 'Cocos Islands' },
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Comoros', label: 'Comoros' },
  { value: 'Cook Islands', label: 'Cook Islands' },
  { value: 'Costa Rica', label: 'Costa Rica' },
  { value: 'Croatia', label: 'Croatia' },
  { value: 'Cuba', label: 'Cuba' },
  { value: 'Curaçao', label: 'Curaçao' },
  { value: 'Cyprus', label: 'Cyprus' },
  { value: 'Czech Republic', label: 'Czech Republic' },
  { value: 'Democratic Republic of the Congo', label: 'Democratic Republic of the Congo' },
  { value: 'Denmark', label: 'Denmark' },
  { value: 'Djibouti', label: 'Djibouti' },
  { value: 'Dominica', label: 'Dominica' },
  { value: 'Dominican Republic', label: 'Dominican Republic' },
  { value: 'East Timor', label: 'East Timor' },
  { value: 'Ecuador', label: 'Ecuador' },
  { value: 'Egypt', label: 'Egypt' },
  { value: 'El Salvador', label: 'El Salvador' },
  { value: 'Equatorial Guinea', label: 'Equatorial Guinea' },
  { value: 'Eritrea', label: 'Eritrea' },
  { value: 'Estonia', label: 'Estonia' },
  { value: 'Eswatini', label: 'Eswatini' },
  { value: 'Ethiopia', label: 'Ethiopia' },
  { value: 'Falkland Islands', label: 'Falkland Islands' },
  { value: 'Faroe Islands', label: 'Faroe Islands' },
  { value: 'Fiji', label: 'Fiji' },
  { value: 'Finland', label: 'Finland' },
  { value: 'France', label: 'France' },
  { value: 'French Polynesia', label: 'French Polynesia' },
  { value: 'Gabon', label: 'Gabon' },
  { value: 'Gambia', label: 'Gambia' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Ghana', label: 'Ghana' },
  { value: 'Gibraltar', label: 'Gibraltar' },
  { value: 'Greece', label: 'Greece' },
  { value: 'Greenland', label: 'Greenland' },
  { value: 'Grenada', label: 'Grenada' },
  { value: 'Guam', label: 'Guam' },
  { value: 'Guatemala', label: 'Guatemala' },
  { value: 'Guernsey', label: 'Guernsey' },
  { value: 'Guinea', label: 'Guinea' },
  { value: 'Guinea-Bissau', label: 'Guinea-Bissau' },
  { value: 'Guyana', label: 'Guyana' },
  { value: 'Haiti', label: 'Haiti' },
  { value: 'Honduras', label: 'Honduras' },
  { value: 'Hong Kong', label: 'Hong Kong' },
  { value: 'Hungary', label: 'Hungary' },
  { value: 'Iceland', label: 'Iceland' },
  { value: 'India', label: 'India' },
  { value: 'Indonesia', label: 'Indonesia' },
  { value: 'Iran', label: 'Iran' },
  { value: 'Iraq', label: 'Iraq' },
  { value: 'Ireland', label: 'Ireland' },
  { value: 'Isle of Man', label: 'Isle of Man' },
  { value: 'Israel', label: 'Israel' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Ivory Coast', label: 'Ivory Coast' },
  { value: 'Jamaica', label: 'Jamaica' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Jersey', label: 'Jersey' },
  { value: 'Jordan', label: 'Jordan' },
  { value: 'Kazakhstan', label: 'Kazakhstan' },
  { value: 'Kenya', label: 'Kenya' },
  { value: 'Kiribati', label: 'Kiribati' },
  { value: 'Kosovo', label: 'Kosovo' },
  { value: 'Kuwait', label: 'Kuwait' },
  { value: 'Kyrgyzstan', label: 'Kyrgyzstan' },
  { value: 'Laos', label: 'Laos' },
  { value: 'Latvia', label: 'Latvia' },
  { value: 'Lebanon', label: 'Lebanon' },
  { value: 'Lesotho', label: 'Lesotho' },
  { value: 'Liberia', label: 'Liberia' },
  { value: 'Libya', label: 'Libya' },
  { value: 'Liechtenstein', label: 'Liechtenstein' },
  { value: 'Lithuania', label: 'Lithuania' },
  { value: 'Luxembourg', label: 'Luxembourg' },
  { value: 'Macau', label: 'Macau' },
  { value: 'Madagascar', label: 'Madagascar' },
  { value: 'Malawi', label: 'Malawi' },
  { value: 'Malaysia', label: 'Malaysia' },
  { value: 'Maldives', label: 'Maldives' },
  { value: 'Mali', label: 'Mali' },
  { value: 'Malta', label: 'Malta' },
  { value: 'Marshall Islands', label: 'Marshall Islands' },
  { value: 'Martinique', label: 'Martinique' },
  { value: 'Mauritania', label: 'Mauritania' },
  { value: 'Mauritius', label: 'Mauritius' },
  { value: 'Mayotte', label: 'Mayotte' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Micronesia', label: 'Micronesia' },
  { value: 'Moldova', label: 'Moldova' },
  { value: 'Monaco', label: 'Monaco' },
  { value: 'Mongolia', label: 'Mongolia' },
  { value: 'Montenegro', label: 'Montenegro' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Morocco', label: 'Morocco' },
  { value: 'Mozambique', label: 'Mozambique' },
  { value: 'Myanmar', label: 'Myanmar' },
  { value: 'Namibia', label: 'Namibia' },
  { value: 'Nauru', label: 'Nauru' },
  { value: 'Nepal', label: 'Nepal' },
  { value: 'Netherlands', label: 'Netherlands' },
  { value: 'New Caledonia', label: 'New Caledonia' },
  { value: 'New Zealand', label: 'New Zealand' },
  { value: 'Nicaragua', label: 'Nicaragua' },
  { value: 'Niger', label: 'Niger' },
  { value: 'Nigeria', label: 'Nigeria' },
  { value: 'Niue', label: 'Niue' },
  { value: 'North Korea', label: 'North Korea' },
  { value: 'North Macedonia', label: 'North Macedonia' },
  { value: 'Northern Mariana Islands', label: 'Northern Mariana Islands' },
  { value: 'Norway', label: 'Norway' },
  { value: 'Oman', label: 'Oman' },
  { value: 'Pakistan', label: 'Pakistan' },
  { value: 'Palau', label: 'Palau' },
  { value: 'Palestine', label: 'Palestine' },
  { value: 'Panama', label: 'Panama' },
  { value: 'Papua New Guinea', label: 'Papua New Guinea' },
  { value: 'Paraguay', label: 'Paraguay' },
  { value: 'Peru', label: 'Peru' },
  { value: 'Philippines', label: 'Philippines' },
  { value: 'Poland', label: 'Poland' },
  { value: 'Portugal', label: 'Portugal' },
  { value: 'Puerto Rico', label: 'Puerto Rico' },
  { value: 'Qatar', label: 'Qatar' },
  { value: 'Republic of the Congo', label: 'Republic of the Congo' },
  { value: 'Réunion', label: 'Réunion' },
  { value: 'Romania', label: 'Romania' },
  { value: 'Russia', label: 'Russia' },
  { value: 'Rwanda', label: 'Rwanda' },
  { value: 'Saint Helena', label: 'Saint Helena' },
  { value: 'Saint Kitts and Nevis', label: 'Saint Kitts and Nevis' },
  { value: 'Saint Lucia', label: 'Saint Lucia' },
  { value: 'Saint Pierre and Miquelon', label: 'Saint Pierre and Miquelon' },
  { value: 'Saint Vincent and the Grenadines', label: 'Saint Vincent and the Grenadines' },
  { value: 'Samoa', label: 'Samoa' },
  { value: 'San Marino', label: 'San Marino' },
  { value: 'São Tomé and Príncipe', label: 'São Tomé and Príncipe' },
  { value: 'Saudi Arabia', label: 'Saudi Arabia' },
  { value: 'Senegal', label: 'Senegal' },
  { value: 'Serbia', label: 'Serbia' },
  { value: 'Seychelles', label: 'Seychelles' },
  { value: 'Sierra Leone', label: 'Sierra Leone' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Sint Maarten', label: 'Sint Maarten' },
  { value: 'Slovakia', label: 'Slovakia' },
  { value: 'Slovenia', label: 'Slovenia' },
  { value: 'Solomon Islands', label: 'Solomon Islands' },
  { value: 'Somalia', label: 'Somalia' },
  { value: 'South Africa', label: 'South Africa' },
  { value: 'South Korea', label: 'South Korea' },
  { value: 'South Sudan', label: 'South Sudan' },
  { value: 'Spain', label: 'Spain' },
  { value: 'Sri Lanka', label: 'Sri Lanka' },
  { value: 'Sudan', label: 'Sudan' },
  { value: 'Suriname', label: 'Suriname' },
  { value: 'Sweden', label: 'Sweden' },
  { value: 'Switzerland', label: 'Switzerland' },
  { value: 'Syria', label: 'Syria' },
  { value: 'Taiwan', label: 'Taiwan' },
  { value: 'Tajikistan', label: 'Tajikistan' },
  { value: 'Tanzania', label: 'Tanzania' },
  { value: 'Thailand', label: 'Thailand' },
  { value: 'Togo', label: 'Togo' },
  { value: 'Tonga', label: 'Tonga' },
  { value: 'Trinidad and Tobago', label: 'Trinidad and Tobago' },
  { value: 'Tunisia', label: 'Tunisia' },
  { value: 'Turkey', label: 'Turkey' },
  { value: 'Turkmenistan', label: 'Turkmenistan' },
  { value: 'Tuvalu', label: 'Tuvalu' },
  { value: 'Uganda', label: 'Uganda' },
  { value: 'Ukraine', label: 'Ukraine' },
  { value: 'United Arab Emirates', label: 'United Arab Emirates' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'United States', label: 'United States' },
  { value: 'Uruguay', label: 'Uruguay' },
  { value: 'Uzbekistan', label: 'Uzbekistan' },
  { value: 'Vanuatu', label: 'Vanuatu' },
  { value: 'Vatican City', label: 'Vatican City' },
  { value: 'Venezuela', label: 'Venezuela' },
  { value: 'Vietnam', label: 'Vietnam' },
  { value: 'Western Sahara', label: 'Western Sahara' },
  { value: 'Yemen', label: 'Yemen' },
  { value: 'Zambia', label: 'Zambia' },
  { value: 'Zimbabwe', label: 'Zimbabwe' },
  { value: 'Unknown', label: 'Unknown' }
]
