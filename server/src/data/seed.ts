import pool from '../config/db';
import dotenv from 'dotenv';

dotenv.config();

const colleges = [
  {
    name: 'IIT Bombay',
    location: 'Mumbai',
    state: 'Maharashtra',
    fees_min: 200000,
    fees_max: 250000,
    rating: 4.9,
    established: 1958,
    affiliation: 'Autonomous (IIT)',
    type: 'Government',
    placement_avg: 1800000,
    placement_highest: 30000000,
    description:
      'Indian Institute of Technology Bombay is one of the most prestigious engineering institutions in India, known for world-class research and top placements.',
    image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
  },
  {
    name: 'IIT Delhi',
    location: 'New Delhi',
    state: 'Delhi',
    fees_min: 200000,
    fees_max: 250000,
    rating: 4.8,
    established: 1961,
    affiliation: 'Autonomous (IIT)',
    type: 'Government',
    placement_avg: 1750000,
    placement_highest: 28000000,
    description:
      'IIT Delhi is a premier engineering institute in the capital, with strong industry connections and excellent research infrastructure.',
    image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
  },
  {
    name: 'IIT Madras',
    location: 'Chennai',
    state: 'Tamil Nadu',
    fees_min: 200000,
    fees_max: 240000,
    rating: 4.8,
    established: 1959,
    affiliation: 'Autonomous (IIT)',
    type: 'Government',
    placement_avg: 1700000,
    placement_highest: 27000000,
    description:
      'India\'s top-ranked engineering institution for multiple consecutive years, IIT Madras offers cutting-edge programs in tech and research.',
    image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800',
  },
  {
    name: 'IIT Kanpur',
    location: 'Kanpur',
    state: 'Uttar Pradesh',
    fees_min: 200000,
    fees_max: 240000,
    rating: 4.7,
    established: 1959,
    affiliation: 'Autonomous (IIT)',
    type: 'Government',
    placement_avg: 1650000,
    placement_highest: 25000000,
    description:
      'IIT Kanpur is renowned for its strong programs in sciences, engineering and humanities, producing many distinguished alumni.',
    image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
  },
  {
    name: 'IIT Kharagpur',
    location: 'Kharagpur',
    state: 'West Bengal',
    fees_min: 180000,
    fees_max: 230000,
    rating: 4.7,
    established: 1951,
    affiliation: 'Autonomous (IIT)',
    type: 'Government',
    placement_avg: 1600000,
    placement_highest: 24000000,
    description:
      'The oldest and largest IIT campus, IIT Kharagpur offers a vast array of programs and has an illustrious alumni network worldwide.',
    image_url: 'https://images.unsplash.com/photo-1571260898694-a3d7dbde8328?w=800',
  },
  {
    name: 'NIT Trichy',
    location: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    fees_min: 80000,
    fees_max: 150000,
    rating: 4.5,
    established: 1964,
    affiliation: 'Autonomous (NIT)',
    type: 'Government',
    placement_avg: 1000000,
    placement_highest: 12000000,
    description:
      'Consistently ranked the best NIT in India, NIT Trichy offers excellent engineering education with strong placement records.',
    image_url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800',
  },
  {
    name: 'NIT Warangal',
    location: 'Warangal',
    state: 'Telangana',
    fees_min: 80000,
    fees_max: 150000,
    rating: 4.4,
    established: 1959,
    affiliation: 'Autonomous (NIT)',
    type: 'Government',
    placement_avg: 950000,
    placement_highest: 11000000,
    description:
      'One of the oldest NITs, NIT Warangal is well-known for its technical programs and consistently strong campus placements.',
    image_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800',
  },
  {
    name: 'NIT Surathkal',
    location: 'Mangalore',
    state: 'Karnataka',
    fees_min: 75000,
    fees_max: 140000,
    rating: 4.3,
    established: 1960,
    affiliation: 'Autonomous (NIT)',
    type: 'Government',
    placement_avg: 900000,
    placement_highest: 10500000,
    description:
      'Located on the scenic Karnataka coast, NIT Surathkal is among the top NITs with excellent faculty and research facilities.',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
  },
  {
    name: 'BITS Pilani',
    location: 'Pilani',
    state: 'Rajasthan',
    fees_min: 400000,
    fees_max: 500000,
    rating: 4.6,
    established: 1964,
    affiliation: 'Deemed University',
    type: 'Deemed',
    placement_avg: 1500000,
    placement_highest: 22000000,
    description:
      'BITS Pilani is a premier private engineering university known for its unique dual-degree programs and Practice School placements.',
    image_url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800',
  },
  {
    name: 'VIT Vellore',
    location: 'Vellore',
    state: 'Tamil Nadu',
    fees_min: 180000,
    fees_max: 300000,
    rating: 4.2,
    established: 1984,
    affiliation: 'Deemed University',
    type: 'Deemed',
    placement_avg: 650000,
    placement_highest: 8000000,
    description:
      'VIT Vellore is one of India\'s largest private universities with over 50,000 students and a large campus placement cell.',
    image_url: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=800',
  },
  {
    name: 'Manipal Institute of Technology',
    location: 'Manipal',
    state: 'Karnataka',
    fees_min: 250000,
    fees_max: 350000,
    rating: 4.1,
    established: 1957,
    affiliation: 'Manipal Academy of Higher Education',
    type: 'Deemed',
    placement_avg: 600000,
    placement_highest: 7000000,
    description:
      'MIT Manipal is a highly reputed institution offering diverse engineering and technology programs with strong industry connections.',
    image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
  },
  {
    name: 'SRM Institute of Science and Technology',
    location: 'Chennai',
    state: 'Tamil Nadu',
    fees_min: 200000,
    fees_max: 280000,
    rating: 3.9,
    established: 1985,
    affiliation: 'Deemed University',
    type: 'Deemed',
    placement_avg: 500000,
    placement_highest: 6000000,
    description:
      'SRM is one of India\'s top private universities with a large student body and active campus recruitment by MNCs.',
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  },
  {
    name: 'Amity University',
    location: 'Noida',
    state: 'Uttar Pradesh',
    fees_min: 300000,
    fees_max: 450000,
    rating: 3.8,
    established: 2005,
    affiliation: 'Private University',
    type: 'Private',
    placement_avg: 450000,
    placement_highest: 5000000,
    description:
      'Amity University Noida is India\'s largest private university offering 200+ programs across engineering, management and law.',
    image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
  },
  {
    name: 'Christ University',
    location: 'Bangalore',
    state: 'Karnataka',
    fees_min: 150000,
    fees_max: 250000,
    rating: 4.0,
    established: 1969,
    affiliation: 'Deemed University',
    type: 'Deemed',
    placement_avg: 550000,
    placement_highest: 6500000,
    description:
      'Christ University Bangalore is a reputed deemed university known for its discipline, academics and strong alumni network.',
    image_url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
  },
  {
    name: 'University of Delhi',
    location: 'New Delhi',
    state: 'Delhi',
    fees_min: 30000,
    fees_max: 80000,
    rating: 4.4,
    established: 1922,
    affiliation: 'Central Government',
    type: 'Government',
    placement_avg: 700000,
    placement_highest: 9000000,
    description:
      'One of India\'s oldest central universities, DU offers a wide range of undergraduate and postgraduate programs across 80+ colleges.',
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
  },
  {
    name: 'University of Mumbai',
    location: 'Mumbai',
    state: 'Maharashtra',
    fees_min: 25000,
    fees_max: 70000,
    rating: 4.0,
    established: 1857,
    affiliation: 'State Government',
    type: 'Government',
    placement_avg: 600000,
    placement_highest: 7500000,
    description:
      'One of India\'s largest universities by enrollment, University of Mumbai has a rich legacy and offers diverse academic programs.',
    image_url: 'https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=800',
  },
  {
    name: 'Anna University',
    location: 'Chennai',
    state: 'Tamil Nadu',
    fees_min: 60000,
    fees_max: 120000,
    rating: 4.3,
    established: 1978,
    affiliation: 'State Government',
    type: 'Government',
    placement_avg: 700000,
    placement_highest: 8000000,
    description:
      'Anna University is a renowned technical university in Tamil Nadu, affiliating over 500+ engineering colleges across the state.',
    image_url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
  },
  {
    name: 'Jadavpur University',
    location: 'Kolkata',
    state: 'West Bengal',
    fees_min: 50000,
    fees_max: 100000,
    rating: 4.4,
    established: 1955,
    affiliation: 'State Government',
    type: 'Government',
    placement_avg: 800000,
    placement_highest: 9500000,
    description:
      'Jadavpur University is among the top engineering institutions in eastern India, known for academics, research and student activism.',
    image_url: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800',
  },
  {
    name: 'Thapar Institute of Engineering and Technology',
    location: 'Patiala',
    state: 'Punjab',
    fees_min: 250000,
    fees_max: 350000,
    rating: 4.1,
    established: 1956,
    affiliation: 'Deemed University',
    type: 'Deemed',
    placement_avg: 750000,
    placement_highest: 8500000,
    description:
      'Thapar Institute is a leading private technical university known for its focus on innovation, research and strong industry ties.',
    image_url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800',
  },
  {
    name: 'Symbiosis International University',
    location: 'Pune',
    state: 'Maharashtra',
    fees_min: 300000,
    fees_max: 450000,
    rating: 3.9,
    established: 2002,
    affiliation: 'Deemed University',
    type: 'Deemed',
    placement_avg: 700000,
    placement_highest: 9000000,
    description:
      'Symbiosis International University is a multi-disciplinary institution in Pune offering programs in law, management, engineering and health sciences.',
    image_url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800',
  },
];

const courseTemplates = [
  { name: 'B.Tech Computer Science', duration: '4 Years', multiplier: 1.0, seats: 120 },
  { name: 'B.Tech Electronics & Communication', duration: '4 Years', multiplier: 0.95, seats: 90 },
  { name: 'B.Tech Mechanical Engineering', duration: '4 Years', multiplier: 0.9, seats: 90 },
  { name: 'B.Tech Civil Engineering', duration: '4 Years', multiplier: 0.85, seats: 60 },
  { name: 'M.Tech Computer Science', duration: '2 Years', multiplier: 1.1, seats: 40 },
  { name: 'MBA', duration: '2 Years', multiplier: 1.2, seats: 60 },
];

const seed = async (): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Clear existing data
    await client.query('DELETE FROM courses');
    await client.query('DELETE FROM saved_colleges');
    await client.query('DELETE FROM compare_history');
    await client.query('DELETE FROM colleges');
    await client.query('ALTER SEQUENCE colleges_id_seq RESTART WITH 1');
    await client.query('ALTER SEQUENCE courses_id_seq RESTART WITH 1');

    // Insert colleges
    for (const college of colleges) {
      const result = await client.query(
        `INSERT INTO colleges (name, location, state, fees_min, fees_max, rating, established,
         affiliation, type, placement_avg, placement_highest, description, image_url)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id`,
        [
          college.name,
          college.location,
          college.state,
          college.fees_min,
          college.fees_max,
          college.rating,
          college.established,
          college.affiliation,
          college.type,
          college.placement_avg,
          college.placement_highest,
          college.description,
          college.image_url,
        ]
      );

      const collegeId = result.rows[0].id;

      // Insert courses for each college
      for (const template of courseTemplates) {
        const fees = Math.round(college.fees_min * template.multiplier);
        await client.query(
          `INSERT INTO courses (college_id, name, duration, fees, seats)
           VALUES ($1, $2, $3, $4, $5)`,
          [collegeId, template.name, template.duration, fees, template.seats]
        );
      }
    }

    await client.query('COMMIT');
    console.log(`✅ Seeded ${colleges.length} colleges with courses successfully`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Seed failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
