export const waypointFormRules = {
    name: [
        (value) => !!value || "A unique name is required.",
        (value) =>
            (value && value.length <= 1000) ||
            "Name is unusually long, please shorten.",
    ],
    required_text: [(value) => !!value || "This field is required."],
    basic_input_under_1000: [
        (value) =>
            (value ? value.length <= 1000 : true) ||
            "This field should be less than 1000 characters.",
    ],
    latitude: [
        (value) =>
            (value ? value >= -90 && value <= 90 : true) ||
            "Latitude is between -90 and 90",
    ],
    latitude_required: [
        (value) => !!value || "This field is required.",
        (value) =>
            (value && value >= -90 && value <= 90) ||
            "Latitude is between -90 and 90",
    ],
    longitude: [
        (value) =>
            (value ? value >= -180 && value <= 180 : true) ||
            "Longitude is between -180 and 180",
    ],
    longitude_required: [
        (value) => !!value || "This field is required.",
        (value) =>
            (value && value >= -180 && value <= 180) ||
            "Longitude is between -180 and 180",
    ]
}