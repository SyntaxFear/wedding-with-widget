import Foundation

struct MyData: Codable {
    let carName: String
    let year: String
    let techStatus: String
    let nextInspection: String
    let totalFines: Int
    let unpaidFines: Int
    let lastUpdated: String
    let updatableText: String
    // Add image-related properties
    let imageUri: String?
    let imageScale: Double
    let imagePosition: ImagePosition
}

// Add position structure to match React Native's position props
struct ImagePosition: Codable {
    let x: Double
    let y: Double
}
