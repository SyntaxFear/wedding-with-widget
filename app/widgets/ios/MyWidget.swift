import WidgetKit
import SwiftUI
import ExpoModulesCore

let logger = Logger(logHandlers: [MyLogHandler()])

func getEntry() -> SimpleEntry {
    // Get the app's document directory
    guard let documentDirectory = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first else {
        return getFallbackEntry()
    }
    
    let widgetDataPath = documentDirectory.appendingPathComponent("widget_data.json")
    
    do {
        let jsonData = try String(contentsOf: widgetDataPath, encoding: .utf8)
        let decoder = JSONDecoder()
        let data = try decoder.decode(MyData.self, from: jsonData.data(using: .utf8)!)
        return SimpleEntry(date: Date(), data: data)
    } catch {
        logger.log(message: "Error reading widget data: \(error.localizedDescription)")
        return getFallbackEntry()
    }
}

func getFallbackEntry() -> SimpleEntry {
    return SimpleEntry(
        date: Date(),
        data: MyData(
            carName: "BMW M4",
            year: "Competition 2023",
            techStatus: "Valid",
            nextInspection: "23d",
            totalFines: 12,
            unpaidFines: 3,
            lastUpdated: "2 min ago",
            updatableText: "Enter text from dashboard...",
            imageUri: nil,
            imageScale: 1.0,
            imagePosition: ImagePosition(x: -30, y: 0)
        )
    )
}

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        getEntry()
    }
    
    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = getEntry()
        completion(entry)
    }
    
    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let date = Date()
        let entry = getEntry()
        let nextUpdateDate = Calendar.current.date(byAdding: .minute, value: 1, to: date)!
        let timeline = Timeline(
            entries: [entry],
            policy: .after(nextUpdateDate)
        )
        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let data: MyData
}

struct StatusBox: View {
    let title: String
    let value: String
    let valueColor: Color
    let icon: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack(spacing: 4) {
                // Icon container
                ZStack {
                    Color.black.opacity(0.2)
                        .frame(width: 20, height: 20)
                        .cornerRadius(6)
                    
                    Image(systemName: icon)
                        .font(.system(size: 12))
                        .foregroundColor(valueColor)
                }
                
                Text(title)
                    .font(.system(size: 10))
                    .foregroundColor(Color.gray)
            }
            
            Text(value)
                .font(.system(size: 14, weight: .medium))
                .foregroundColor(valueColor)
        }
        .padding(8)
        .background(Color.white.opacity(0.1))
        .cornerRadius(8)
        .overlay(
            RoundedRectangle(cornerRadius: 8)
                .stroke(Color.white.opacity(0.05), lineWidth: 1)
        )
    }
}

struct MyWidgetEntryView : View {
    var entry: Provider.Entry
    
    var body: some View {
        ZStack {
            // Background
            Color(.black)
                .cornerRadius(24)
            
            HStack(spacing: 0) {
                // Left Section: Info
                VStack(alignment: .leading, spacing: 8) {
                    // Car Info Header
                    VStack(alignment: .leading, spacing: 2) {
                        Text(entry.data.carName)
                            .font(.system(size: 20))
                            .foregroundColor(.white)
                        Text(entry.data.year)
                            .font(.system(size: 12))
                            .foregroundColor(Color.gray)
                    }
                    
                    Spacer()
                    
                    // Status Boxes Grid
                    VStack(spacing: 4) {
                        HStack(spacing: 4) {
                            StatusBox(
                                title: "Tech Status",
                                value: entry.data.techStatus,
                                valueColor: Color(red: 0.133, green: 0.773, blue: 0.369), // #22C55E
                                icon: "checkmark.circle"
                            )
                            StatusBox(
                                title: "Next Check",
                                value: entry.data.nextInspection,
                                valueColor: Color(red: 0.976, green: 0.451, blue: 0.086), // #F97316
                                icon: "clock"
                            )
                        }
                        HStack(spacing: 4) {
                            StatusBox(
                                title: "Total Fines",
                                value: "\(entry.data.totalFines)",
                                valueColor: .white,
                                icon: "doc.text"
                            )
                            StatusBox(
                                title: "Unpaid",
                                value: "\(entry.data.unpaidFines)",
                                valueColor: Color(red: 0.937, green: 0.267, blue: 0.267), // #EF4444
                                icon: "exclamationmark.triangle"
                            )
                        }
                    }
                }
                .frame(width: UIScreen.main.bounds.width * 0.6)
                .padding()
                
                // Right Section: Car Image with Shadow
                if let imageUrl = entry.data.imageUri,
                   let url = URL(string: imageUrl) {
                    AsyncImage(url: url) { image in
                        image
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: UIScreen.main.bounds.width * 0.6)
                            .shadow(color: Color.black.opacity(0.8), radius: 24, x: 0, y: 16)
                            .offset(x: CGFloat(entry.data.imagePosition.x),
                                    y: CGFloat(entry.data.imagePosition.y))
                            .scaleEffect(entry.data.imageScale)
                    } placeholder: {
                        Image("removed_bg")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: UIScreen.main.bounds.width * 0.6)
                            .shadow(color: Color.black.opacity(0.8), radius: 24, x: 0, y: 16)
                            .offset(x: CGFloat(entry.data.imagePosition.x),
                                    y: CGFloat(entry.data.imagePosition.y))
                            .scaleEffect(entry.data.imageScale)
                    }
                } else {
                    Image("removed_bg")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: UIScreen.main.bounds.width * 0.6)
                        .shadow(color: Color.black.opacity(0.8), radius: 24, x: 0, y: 16)
                        .offset(x: CGFloat(entry.data.imagePosition.x),
                                y: CGFloat(entry.data.imagePosition.y))
                        .scaleEffect(entry.data.imageScale)
                }
            }
            .padding(12)
        }
    }
}

struct MyWidget: Widget {
    let kind: String = "CarWidget"
    
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            MyWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Car Status")
        .description("Shows your car's status with customizable image.")
        .supportedFamilies([.systemMedium])
    }
}

struct MyWidget_Previews: PreviewProvider {
    static var previews: some View {
        let entry = getEntry()
        MyWidgetEntryView(entry: entry)
            .previewContext(WidgetPreviewContext(family: .systemMedium))
    }
}
