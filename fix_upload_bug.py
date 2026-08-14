import re

with open('src/pages/PostPage.jsx', 'r') as f:
    content = f.read()

# The error could be that user.uid is undefined. user in supabase is session.user.id
# Let's fix user.uid to user.id or session.user.id

content = content.replace("user.uid", "(user?.uid || session?.user?.id)")

with open('src/pages/PostPage.jsx', 'w') as f:
    f.write(content)
