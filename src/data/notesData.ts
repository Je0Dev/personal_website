export interface Note {
  title: string;
  date: string;
  readTime: string;
  type: 'Article' | 'Thought';
  tags: string[];
  excerpt: string;
  content: string;
  codeSnippets?: { language: string; code: string }[];
  slug: string;
  color: string;
  relatedProjects?: { title: string; link: string }[];
}

export const notesData: Note[] = [
  {
    title: 'Demystifying C-Pointers',
    date: 'March 26, 2026',
    readTime: '5 min read',
    type: 'Article',
    tags: ['C', 'Programming', 'Memory'],
    excerpt: 'Finally understanding pointers in C - one of the most confusing concepts.',
    content: `Pointers are often cited as the most confusing part of the C language. At their core, they are just variables that store memory addresses.

Imagine memory as a massive array of mailboxes, each with a unique number. A pointer simply holds the number of a specific mailbox ("pointing" to the corresponding unique number).

When you use the symbol * (dereferencing operator), you are opening the mailbox and looking at its contents. Similarly, using the symbol &, you are finding the address of the variable. So, always remember that a pointer likes knowing "where" something lives, and through him you can change the "contents" of that place.`,
    codeSnippets: [
      {
        language: 'c',
        code: `// Basic pointer example
int x = 10;
int *ptr = &x;  // ptr now holds the address of x

printf("Value of x: %d\\n", x);      // 10
printf("Address of x: %p\\n", &x);  // 0x7fff...
printf("Value of ptr: %p\\n", ptr);  // 0x7fff...
printf("Value pointed by ptr: %d\\n", *ptr);  // 10`
      },
      {
        language: 'c',
        code: `// Pointer arithmetic
int arr[] = {10, 20, 30, 40, 50};
int *p = arr;

for (int i = 0; i < 5; i++) {
    printf("arr[%d] = %d at address %p\\n", i, *(p + i), p + i);
}

// Output:
// arr[0] = 10 at address 0x7fff...
// arr[1] = 20 at address 0x7fff...+4
// ... (each address is 4 bytes apart)`
      },
      {
        language: 'c',
        code: `// Dynamic memory allocation
#include <stdlib.h>

int *arr = malloc(5 * sizeof(int));
if (arr == NULL) {
    printf("Memory allocation failed!\\n");
    return 1;
}

for (int i = 0; i < 5; i++) {
    arr[i] = i * 10;
}

free(arr);  // Always free allocated memory!`
      }
    ],
    slug: 'demystifying-c-pointers',
    color: 'bg-[var(--accent-green)]',
    relatedProjects: [
      { title: 'CLI ATM System', link: 'https://github.com/Je0Dev/cli_atm_system' },
      { title: 'CLI Task Manager', link: 'https://github.com/Je0Dev/cli_task_manager_system' }
    ]
  },
  {
    title: 'C Makefiles 101',
    date: 'March 28, 2026',
    readTime: '4 min read',
    type: 'Article',
    tags: ['C', 'Makefile', 'Build'],
    excerpt: 'Learn how to write Makefiles for automating your C build process.',
    content: `Makefiles are essential for automating compilation in C projects. They define rules for building your project, handling dependencies, and managing the build process efficiently.`,
    codeSnippets: [
      {
        language: 'makefile',
        code: `# Simple Makefile
CC = gcc
CFLAGS = -Wall -Wextra -g
TARGET = program

all: $(TARGET)

$(TARGET): main.o utils.o
\t$(CC) $(CFLAGS) -o $(TARGET) main.o utils.o

main.o: main.c
\t$(CC) $(CFLAGS) -c main.c

utils.o: utils.c utils.h
\t$(CC) $(CFLAGS) -c utils.c

clean:
\trm -f $(TARGET) *.o

.PHONY: all clean`
      },
      {
        language: 'makefile',
        code: `# Advanced Makefile with variables
CC = gcc
CFLAGS = -Wall -Wextra -O2
LDFLAGS = -lm
SRC = $(wildcard *.c)
OBJ = $(SRC:.c=.o)
TARGET = myprogram

all: $(TARGET)

$(TARGET): $(OBJ)
\t$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS)

%.o: %.c
\t$(CC) $(CFLAGS) -c $<

clean:
\trm -f $(TARGET) $(OBJ)

.PHONY: all clean`
      }
    ],
    slug: 'c-makefiles-101',
    color: 'bg-[var(--accent-cyan)]',
    relatedProjects: [
      { title: 'CLI ATM System', link: 'https://github.com/Je0Dev/cli_atm_system' },
      { title: 'CLI Task Manager', link: 'https://github.com/Je0Dev/cli_task_manager_system' }
    ]
  },
  {
    title: 'React useState Deep Dive',
    date: 'March 25, 2026',
    readTime: '6 min read',
    type: 'Article',
    tags: ['React', 'JavaScript', 'Hooks'],
    excerpt: 'Master useState hook - the foundation of React state management.',
    content: `useState is the most fundamental hook in React. It allows functional components to have their own internal state. Let's explore patterns and best practices.`,
    codeSnippets: [
      {
        language: 'tsx',
        code: `// Basic useState
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`
      },
      {
        language: 'tsx',
        code: `// Functional updates
function Counter() {
  const [count, setCount] = useState(0);
  
  // Correct - use function for previous state
  const increment = () => setCount(prev => prev + 1);
  
  // Can also use with callback
  const decrement = () => setCount(prev => prev - 1);
  
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}`
      },
      {
        language: 'tsx',
        code: `// Multiple state variables
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Or use object for related state
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: 0
  });
  
  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };
  
  return <form>...</form>;
}`
      }
    ],
    slug: 'react-usestate-deep-dive',
    color: 'bg-[var(--accent-pink)]',
    relatedProjects: [
      { title: 'Lang Website', link: 'https://github.com/Je0Dev/lang_website' },
      { title: 'Personal Website', link: 'https://github.com/Je0Dev/personal_website' }
    ]
  },
  {
    title: 'TypeScript Generics',
    date: 'March 22, 2026',
    readTime: '5 min read',
    type: 'Article',
    tags: ['TypeScript', 'Programming'],
    excerpt: 'Write reusable TypeScript code with generics.',
    content: `Generics allow you to write flexible, reusable code that works with multiple types while maintaining type safety. They're one of TypeScript's most powerful features.`,
    codeSnippets: [
      {
        language: 'ts',
        code: `// Basic generic function
function identity<T>(arg: T): T {
  return arg;
}

const num = identity(5);      // type: number
const str = identity("hello");  // type: string`
      },
      {
        language: 'ts',
        code: `// Generic interfaces
interface Box<T> {
  value: T;
  getValue(): T;
}

const stringBox: Box<string> = {
  value: "hello",
  getValue() { return this.value; }
};`
      },
      {
        language: 'ts',
        code: `// Generic constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): number {
  return arg.length;
}

logLength("hello");     // OK
logLength([1, 2, 3]); // OK
logLength(123);        // Error: no length`
      },
      {
        language: 'ts',
        code: `// Generic with keyof
function getProperty<T, K extends keyof T>(
  obj: T, 
  key: K
): T[K] {
  return obj[key];
}

const person = { name: "George", age: 21 };
getProperty(person, "name");  // "George"
getProperty(person, "age");   // 21`
      }
    ],
    slug: 'typescript-generics',
    color: 'bg-[var(--accent-purple)]',
    relatedProjects: [
      { title: 'Lang Website', link: 'https://github.com/Je0Dev/lang_website' },
      { title: 'Personal Website', link: 'https://github.com/Je0Dev/personal_website' }
    ]
  },
  {
    title: 'Python Virtual Environments',
    date: 'March 18, 2026',
    readTime: '3 min read',
    type: 'Article',
    tags: ['Python', 'Environment'],
    excerpt: 'Isolate your Python projects with venv.',
    content: `Virtual environments keep your project dependencies isolated. Each project can have its own dependencies without conflicts.`,
    codeSnippets: [
      {
        language: 'bash',
        code: `# Create virtual environment
python -m venv myenv

# Activate (Linux/Mac)
source myenv/bin/activate

# Activate (Windows)
myenv\\Scripts\\activate

# Install packages
pip install requests numpy

# Deactivate when done
deactivate`
      },
      {
        language: 'bash',
        code: `# Using requirements.txt
pip freeze > requirements.txt

# Install from requirements
pip install -r requirements.txt

# Common best practice structure:
# project/
#   venv/
#   src/
#   requirements.txt
#   README.md`
      }
    ],
    slug: 'python-virtual-environments',
    color: 'bg-[var(--accent-green)]',
    relatedProjects: [
      { title: 'Echoes: Fallen Kingdom', link: 'https://github.com/Je0Dev/echoes_fallen_kingdom_game_python' }
    ]
  },
  {
    title: 'ESP32 Getting Started',
    date: 'March 15, 2026',
    readTime: '4 min read',
    type: 'Article',
    tags: ['ESP32', 'IoT', 'Embedded'],
    excerpt: 'Begin your ESP32 journey with this quickstart guide.',
    content: `The ESP32 is a powerful low-cost microcontroller with WiFi and Bluetooth. Perfect for IoT projects. Here's how to get started.`,
    codeSnippets: [
      {
        language: 'cpp',
        code: `// Basic ESP32 blink
#include <Arduino.h>

#define LED_BUILTIN 2

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`
      },
      {
        language: 'cpp',
        code: `// ESP32 WiFi connection
#include <WiFi.h>

const char* ssid = "YourSSID";
const char* password = "YourPassword";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("Connected!");
  Serial.println(WiFi.localIP());
}`
      },
      {
        language: 'cpp',
        code: `// ESP32 Temperature Sensor (DHT22)
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  
  Serial.print("Temp: ");
  Serial.print(temp);
  Serial.print("C, Hum: ");
  Serial.println(hum);
  
  delay(2000);
}`
      }
    ],
    slug: 'esp32-getting-started',
    color: 'bg-[var(--accent-yellow)]',
    relatedProjects: [
      { title: 'ESP32 Timer Sensor', link: 'https://github.com/Je0Dev/esp32OffboardTimerSensor' }
    ]
  },
  {
    title: 'Python List Comprehensions',
    date: 'March 20, 2026',
    readTime: '3 min read',
    type: 'Article',
    tags: ['Python', 'Programming'],
    excerpt: 'Master list comprehensions for cleaner, more Pythonic code.',
    content: `List comprehensions provide a concise way to create lists in Python. They're more readable and often faster than traditional loops.`,
    codeSnippets: [
      {
        language: 'python',
        code: `# Basic list comprehension
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Nested comprehension
matrix = [[i*j for j in range(3)] for i in range(3)]
# [[0, 0, 0], [0, 1, 2], [0, 2, 4]]`
      },
      {
        language: 'python',
        code: `# Dictionary comprehension
word = "hello"
freq = {char: word.count(char) for char in word}
# {'h': 1, 'e': 1, 'l': 2, 'o': 1}

# Set comprehension
text = "hello world"
vowels = {char for char in text if char in 'aeiou'}
# {'o', 'e'}`
      }
    ],
    slug: 'python-list-comprehensions',
    color: 'bg-[var(--accent-cyan)]',
    relatedProjects: [{ title: 'Echoes: Fallen Kingdom', link: '#' }]
  },
  {
    title: 'React useEffect Best Practices',
    date: 'March 15, 2026',
    readTime: '4 min read',
    type: 'Article',
    tags: ['React', 'JavaScript', 'Hooks'],
    excerpt: 'Understanding useEffect dependencies and cleanup functions.',
    content: `useEffect is one of the most powerful hooks in React, but it can be tricky. Understanding when and how to use it properly is crucial for writing bug-free React applications.`,
    codeSnippets: [
      {
        language: 'tsx',
        code: `// Basic useEffect - runs after every render
useEffect(() => {
  console.log('Component rendered!');
});

// Run only on mount
useEffect(() => {
  const subscription = api.connect();
  return () => subscription.disconnect(); // Cleanup
}, []); // Empty dependency array

// Run when count changes
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);`
      },
      {
        language: 'tsx',
        code: `// Common mistake - stale closures
function Counter() {
  const [count, setCount] = useState(0);

  // WRONG - count is always 0
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // Always 0!
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // CORRECT - use functional update
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1); // Fresh value!
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <div>{count}</div>;
}`
      }
    ],
    slug: 'react-useeffect-best-practices',
    color: 'bg-[var(--accent-pink)]',
    relatedProjects: [
      { title: 'Lang Website', link: '#' },
      { title: 'Personal Website', link: '#' }
    ]
  },
  {
    title: 'My Journey',
    date: 'March 26, 2026',
    readTime: '1 min read',
    type: 'Thought',
    tags: ['Life', 'Learning'],
    excerpt: 'A personal note to myself and everyone reading this.',
    content: `Since I first started delving into the vast world of engineering after being accepted to the university where I am currently pursuing my bachelor's degree, I have been constantly learning new tools to bring my ideas to life and help others accomplish their goals.

I enjoy improving in as many areas as I can, creating habits that help me better myself every day. The world is changing extremely fast and we can't revert time, so my advice is to cherish every moment. No matter what you are going through, stay on the path and keep pushing. Stay on the grind, but keep your side activities and hobbies alive while you're at it. I hope this note helps even one of you!`,
    slug: 'my-journey',
    color: 'bg-[var(--accent-purple)]',
    relatedProjects: []
  },
  {
    title: 'SQL JOINs Explained',
    date: 'March 10, 2026',
    readTime: '6 min read',
    type: 'Article',
    tags: ['SQL', 'Database', 'Programming'],
    excerpt: 'Understanding different types of SQL JOINs with examples.',
    content: `JOINs are fundamental to relational databases. They allow you to combine rows from two or more tables based on a related column. Understanding the differences between JOIN types is crucial for effective database queries.`,
    codeSnippets: [
      {
        language: 'sql',
        code: `-- INNER JOIN - only matching rows
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- LEFT JOIN - all from left + matching from right
SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

-- RIGHT JOIN - all from right + matching from left
SELECT users.name, orders.total
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;`
      },
      {
        language: 'sql',
        code: `-- FULL OUTER JOIN - all rows from both
SELECT users.name, orders.total
FROM users
FULL OUTER JOIN orders ON users.id = orders.user_id;

-- Multiple JOINs
SELECT 
  orders.id,
  users.name,
  products.title,
  order_items.quantity
FROM orders
JOIN users ON orders.user_id = users.id
JOIN order_items ON orders.id = order_items.order_id
JOIN products ON order_items.product_id = products.id;`
      }
    ],
    slug: 'sql-joins-explained',
    color: 'bg-[var(--accent-yellow)]',
    relatedProjects: [{ title: 'IMDb Clone App', link: '#' }]
  },
];