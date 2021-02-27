"""first version

Revision ID: db4e825405dc
Create Date: 2021-02-28 00:00:59.303311

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'db4e825405dc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
  # ### commands auto generated by Alembic - please adjust! ###
  op.create_table('sys_user', sa.Column('id', sa.Integer(), nullable=False),
                  sa.Column('username', sa.String(), nullable=False),
                  sa.Column('nickname', sa.String(), nullable=False),
                  sa.Column('password', sa.String(), nullable=False),
                  sa.Column('is_active', sa.Boolean(), nullable=True),
                  sa.Column('is_superuser', sa.Boolean(), nullable=True),
                  sa.PrimaryKeyConstraint('id'))
  op.create_index(op.f('ix_sys_user_id'), 'sys_user', ['id'], unique=False)
  op.create_index(op.f('ix_sys_user_nickname'),
                  'sys_user', ['nickname'],
                  unique=False)
  op.create_index(op.f('ix_sys_user_username'),
                  'sys_user', ['username'],
                  unique=True)
  # ### end Alembic commands ###


def downgrade():
  # ### commands auto generated by Alembic - please adjust! ###
  op.drop_index(op.f('ix_sys_user_username'), table_name='sys_user')
  op.drop_index(op.f('ix_sys_user_nickname'), table_name='sys_user')
  op.drop_index(op.f('ix_sys_user_id'), table_name='sys_user')
  op.drop_table('sys_user')
  # ### end Alembic commands ###