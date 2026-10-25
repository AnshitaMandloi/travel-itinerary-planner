from app.models.itinerary import (
    TravelPreferences,
    TravelItineraryResponse,
    TripSummary,
    DayItinerary,
    Activity,
    PackingItem,
)

def generate_mock_itinerary(prefs: TravelPreferences) -> TravelItineraryResponse:
    """
    Generates a realistic, customized mock itinerary when no Gemini API key is configured.
    This allows developers to inspect the UI and test end-to-end flows immediately.
    """
    destination = prefs.destination.strip() or "Kyoto, Japan"
    duration = min(prefs.duration_days, 14)
    party = prefs.travel_party
    budget = prefs.budget
    pace = prefs.pace
    interests_str = ", ".join(prefs.interests) if prefs.interests else "Highlights & Hidden Gems"

    # Define activities pool per time of day
    sample_activities_morning = [
        ("Sunrise Landmark Exploration", f"Start early to experience {destination}'s iconic sights before the crowds arrive. Soak in the morning ambiance and photograph key landmarks in the golden hour.", "Historic Center", "Sightseeing", "2.5 hours", "Free - $10", "Arrive 15 minutes before opening for serene photos."),
        ("Local Heritage & Cultural Walk", f"Take an immersive guided walking tour through historic quarters of {destination}, highlighting architecture and centuries of local heritage.", "Old Quarter", "Culture", "2 hours", "$15 - $25", "Wear comfortable flat footwear for cobblestone alleys."),
        ("Scenic Garden & Nature Walk", f"Breathe in the morning air strolling through pristine gardens and botanical sanctuaries with scenic vistas of {destination}.", "Botanical Grounds", "Nature", "2 hours", "$8", "Bring a refillable water bottle and sunglasses."),
        ("Waterfront / Canal Promenade", f"A picturesque stroll along the famous waterways and bridges of {destination}, observing morning life.", "Riverfront District", "Sightseeing", "1.5 hours", "Free", "Stop at a waterfront cafe for morning brew."),
    ]

    sample_activities_afternoon = [
        ("Culinary Discovery & Market Tasting", f"Delve into the bustling food halls and artisan stalls. Taste authentic regional delicacies and talk with 3rd-generation vendors.", "Central Market", "Food", "2 hours", "$20 - $35", "Cash is preferred at smaller family-run food stalls."),
        ("Art Museum & Gallery Exploration", f"Visit {destination}'s premier art museum featuring both timeless masterworks and contemporary regional creators.", "Cultural District", "Art & Culture", "2.5 hours", "$18", "Book tickets online in advance to skip the queue."),
        ("Boutique Shopping & Artisan Crafts", f"Browse curated independent boutiques, local craft ateliers, and specialized souvenir shops tailored to {interests_str}.", "Design Quarter", "Shopping", "2 hours", "Free entry", "Ask shopkeepers about tax-free shopping rules."),
        ("Panoramic Lookout & Skyline View", f"Head to the highest observation deck or hilltop vantage point for sweeping 360-degree views across {destination}.", "Skyview Tower", "Sightseeing", "1.5 hours", "$15", "Great spot to watch afternoon shadows sweep over the city."),
    ]

    sample_activities_evening = [
        ("Sunset Dinner & Local Gastronomy", f"Indulge in a memorable dinner featuring authentic local dishes aligned with your {budget.lower()} budget and dietary preferences.", "Culinary Alley", "Food", "2 hours", "$30 - $60", "Reserve your table at least 24 hours in advance."),
        ("Evening Illumination & Stroll", f"Experience {destination} after dark when historical facades and riverbanks are beautifully illuminated.", "Lantern Promenade", "Sightseeing", "1.5 hours", "Free", "Crisp evening breezes make this a romantic walk."),
        ("Night Market & Street Food Safari", f"Immerse yourself in neon-lit vibrant night markets with sizzling skewers, desserts, and local music.", "Night Bazaar", "Nightlife", "2 hours", "$15 - $25", "Follow the longest lines for the freshest bites."),
        ("Acoustic Music & Relaxing Lounge", f"Unwind at a cozy speakeasy or acoustic lounge reflecting the local music scene and hospitality.", "Arts Quarter", "Relaxation", "2 hours", "$20", "Try their signature local cocktail or artisanal tea."),
    ]

    days = []
    for day_idx in range(1, duration + 1):
        m_act = sample_activities_morning[(day_idx - 1) % len(sample_activities_morning)]
        a_act = sample_activities_afternoon[(day_idx - 1) % len(sample_activities_afternoon)]
        e_act = sample_activities_evening[(day_idx - 1) % len(sample_activities_evening)]

        activities = [
            Activity(
                time_of_day="Morning",
                time_slot="09:00 AM - 11:30 AM",
                title=f"{m_act[0]} ({destination})",
                description=m_act[1],
                location=f"{m_act[2]}, {destination}",
                category=m_act[3],
                estimated_duration=m_act[4],
                estimated_cost=m_act[5],
                insider_tip=m_act[6]
            ),
            Activity(
                time_of_day="Afternoon",
                time_slot="01:30 PM - 04:00 PM",
                title=f"{a_act[0]}",
                description=a_act[1],
                location=f"{a_act[2]}, {destination}",
                category=a_act[3],
                estimated_duration=a_act[4],
                estimated_cost=a_act[5],
                insider_tip=a_act[6]
            ),
            Activity(
                time_of_day="Evening",
                time_slot="06:30 PM - 09:30 PM",
                title=f"{e_act[0]}",
                description=e_act[1],
                location=f"{e_act[2]}, {destination}",
                category=e_act[3],
                estimated_duration=e_act[4],
                estimated_cost=e_act[5],
                insider_tip=e_act[6]
            ),
        ]

        days.append(
            DayItinerary(
                day_number=day_idx,
                title=f"Day {day_idx}: Highlights & Local Charm",
                theme=f"Exploring {destination}'s iconic sights and hidden corners at a {pace.lower()} pace",
                date=f"Day {day_idx}",
                daily_summary=f"A balanced day combining morning exploration, cultural immersion, and authentic dinner in {destination}.",
                activities=activities,
                meals_recommendation={
                    "breakfast": f"Fresh local pastries and specialty espresso or regional tea near your morning stop.",
                    "lunch": f"Authentic regional lunch menu featuring signature specialties of {destination}.",
                    "dinner": f"Atmospheric dinner with warm local hospitality and seasonal ingredients."
                },
                estimated_daily_budget=f"${'40-70' if 'budget' in budget.lower() else '80-140' if 'moderate' in budget.lower() else '200-350'} per person"
            )
        )

    trip_summary = TripSummary(
        destination=destination,
        total_days=duration,
        travel_party=party,
        budget_tier=budget,
        vibe_overview=(
            f"A bespoke {duration}-day journey through {destination} tailored for a {party.lower()} "
            f"with a {pace.lower()} rhythm. Curated to focus on {interests_str}, "
            f"blending world-class sights with authentic local neighborhood gems."
        ),
        estimated_total_cost=f"${duration * (50 if 'budget' in budget.lower() else 110 if 'moderate' in budget.lower() else 260)} - ${duration * (80 if 'budget' in budget.lower() else 160 if 'moderate' in budget.lower() else 380)} USD",
        best_time_to_visit="Spring (pleasant breezes) and Autumn (golden foliage & cultural festivities)",
        local_transportation_advice=f"Utilize the public metro/rail system with a multi-day rechargeable transit card. The city is exceptionally walkable in central districts."
    )

    packing_checklist = [
        PackingItem(category="Clothing & Footwear", items=[
            "Supportive, broken-in walking shoes (expect 12,000+ daily steps)",
            "Breathable layers suitable for variable morning and evening temperatures",
            "Smart casual evening outfit for nice dinners and cultural venues",
            "Compact lightweight rain jacket or travel umbrella"
        ]),
        PackingItem(category="Electronics & Essentials", items=[
            "Universal power adapter and compact portable power bank (10,000mAh)",
            "Daypack / crossbody anti-theft bag for daily essentials",
            "Passport, digital copies of bookings, and travel insurance policy",
            "Offline map download on Google Maps or Citymapper"
        ]),
        PackingItem(category="Health & Comfort", items=[
            "Refillable insulated water bottle",
            "Personal blister relief tape and compact first-aid items",
            "Sunscreen (SPF 50+) and lip balm",
            "Moisturizing eye drops for long transit days"
        ])
    ]

    general_tips = [
        f"Download offline maps of {destination} before your arrival to easily navigate alleys without cell data.",
        "Keep a small amount of local currency handy; smaller food stalls and lockers often do not accept international credit cards.",
        "Book top museum and landmark tickets 2-3 weeks in advance to secure prime morning time slots.",
        "Respect local etiquette regarding photography in quiet residential neighborhoods and religious shrines.",
        "Carry a compact reusable tote bag for market finds and tax-free shopping purchases."
    ]

    return TravelItineraryResponse(
        trip_summary=trip_summary,
        days=days,
        packing_checklist=packing_checklist,
        general_travel_tips=general_tips
    )
