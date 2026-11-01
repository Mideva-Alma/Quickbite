"""Add weekly waiter schedules

Revision ID: c007300d17f0
Revises: c4c89aa6035d
Create Date: 2026-11-01 14:25:11.299704

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'c007300d17f0'
down_revision = 'c4c89aa6035d'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'weekly_shifts',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('waiter_id', sa.Integer(), nullable=False),
        sa.Column('day_of_week', sa.Integer(), nullable=False),
        sa.Column('start_time', sa.Time(), nullable=False),
        sa.Column('end_time', sa.Time(), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.CheckConstraint(
            'day_of_week >= 0 AND day_of_week <= 6',
            name='ck_weekly_shifts_day_of_week'
        ),
        sa.CheckConstraint(
            'end_time > start_time',
            name='ck_weekly_shifts_valid_time'
        ),
        sa.ForeignKeyConstraint(
            ['waiter_id'],
            ['waiter_profiles.id'],
            ondelete='CASCADE'
        ),
        sa.PrimaryKeyConstraint('id')
    )

    with op.batch_alter_table('weekly_shifts', schema=None) as batch_op:
        batch_op.create_index(
            'ix_weekly_shifts_waiter_day',
            ['waiter_id', 'day_of_week'],
            unique=False
        )
        batch_op.create_index(
            batch_op.f('ix_weekly_shifts_waiter_id'),
            ['waiter_id'],
            unique=False
        )


def downgrade():
    with op.batch_alter_table('weekly_shifts', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_weekly_shifts_waiter_id'))
        batch_op.drop_index('ix_weekly_shifts_waiter_day')

    op.drop_table('weekly_shifts')